import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

const PUBLIC_PATHS = ["/users/login", "/users/register", "/users/refresh"]; // added /refresh — it also needs no access token

api.interceptors.request.use((config) => {
    const isPublic = PUBLIC_PATHS.some((path) => config.url?.includes(path));
    if (isPublic) {
        return config;
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
        const token = JSON.parse(savedUser).token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (res) => res, // successful responses pass through untouched
    async (error) => {
        const originalRequest = error.config;
        const isPublic = PUBLIC_PATHS.some((path) => originalRequest.url?.includes(path));

        if (error.response?.status === 401 && !originalRequest._retry && !isPublic) {
            originalRequest._retry = true; 
            try {
                const savedUser = JSON.parse(localStorage.getItem("user"));

                const refreshResponse = await axios.post("http://localhost:8080/api/users/refresh", {
                    refreshToken: savedUser.refreshToken,
                });

                const newAccessToken = refreshResponse.data.token;

                // Save the new token, then retry the ORIGINAL request with it
                savedUser.token = newAccessToken;
                localStorage.setItem("user", JSON.stringify(savedUser));

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // re-send the original failed request
            } catch (refreshError) {
                // Refresh token itself is invalid/expired — nothing left to do but log out
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;