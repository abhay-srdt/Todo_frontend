import { createApiClient } from "./apiClient";

const profileApi = createApiClient("http://localhost:8081/api");

export default profileApi;