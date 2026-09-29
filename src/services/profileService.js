import profileApi from "./profileApi";

function getErrorMessage(error) {
  return error.response?.data?.message || "Something went wrong. Please try again.";
}

export async function getProfile() {
  try {
    const response = await profileApi.get("/profile/me");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateProfile({ displayName, bio, phone }) {
  try {
    const response = await profileApi.put("/profile/me", { displayName, bio, phone });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function uploadAvatar(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await profileApi.post("/profile/me/avatar", formData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}