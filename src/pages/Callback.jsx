import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Callback({ onLogin }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function finishLogin() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const oauthError = params.get("error");
        const verifier = sessionStorage.getItem("pkce_verifier");

        if (oauthError) throw new Error(`Authorization server returned: ${oauthError}`);
        if (!code) throw new Error("Authorization code not found in the URL");
        if (!verifier) throw new Error("PKCE verifier missing. Start again from the Login page.");

        // Step 1: exchange code + verifier for an access token
        const body = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "react-todo-app",
          code,
          redirect_uri: "http://localhost:5173/callback",
          code_verifier: verifier,
        });

        const response = await fetch("http://localhost:9000/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });

        if (!response.ok) {
          const details = await response.text();
          throw new Error(`Token exchange failed (${response.status}): ${details}`);
        }

        const tokens = await response.json();
        sessionStorage.removeItem("pkce_verifier");
        localStorage.setItem("auth", JSON.stringify(tokens));

        // Step 2: ask TodoBackend who we are (id, name, email)
        const profile = (await api.get("/users/me")).data;
        localStorage.setItem("user", JSON.stringify(profile));

        onLogin(profile);
        navigate("/todos", { replace: true });
      } catch (err) {
        console.error("OAuth callback failed:", err);
        setError(err.message);
      }
    }

    finishLogin();
  }, [navigate, onLogin]);

  return (
    <div className="p-8 text-center">
      {error ? (
        <>
          <h2 className="text-xl font-bold text-red-600">Login failed</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Back to login
          </button>
        </>
      ) : (
        <h2 className="text-xl font-bold">Signing you in...</h2>
      )}
    </div>
  );
}

export default Callback;