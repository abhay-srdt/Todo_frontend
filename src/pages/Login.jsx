
import { useNavigate } from "react-router-dom";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../utils/pkce";

function Login() {
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const verifier = generateCodeVerifier();

      const challenge = await generateCodeChallenge(verifier);

      sessionStorage.setItem("pkce_verifier", verifier);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: "react-todo-app",
        redirect_uri: "http://localhost:5173/callback",
        scope: "todos.read todos.write",
        code_challenge: challenge,
        code_challenge_method: "S256",
      });

      window.location.href =
        `http://localhost:9000/oauth2/authorize?${params.toString()}`;
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">
        Todo App
      </h1>

      <p className="mb-6 text-center text-gray-600">
        Sign in using the Authorization Server
      </p>

      <button
        onClick={handleLogin}
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="mt-4 w-full rounded bg-green-600 p-2 text-white hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
}

export default Login;

