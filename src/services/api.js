import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach the access token to every request
api.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.access_token) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }
  } catch {
    localStorage.removeItem("auth");
  }
  return config;
});

// Token expired or invalid -> clear the session and go to the login page
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;