import axios from "axios";
export function createApiClient(baseURL) {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
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

  client.interceptors.response.use(
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

  return client;
}