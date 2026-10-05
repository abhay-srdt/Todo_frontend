import { createApiClient } from "./apiClient";

const GATEWAY = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

const profileApi = createApiClient(`${GATEWAY}/api`);

export default profileApi;