import axios from "axios";

const AUTH_SERVER = "http://localhost:9000";

function getErrorMessage(error) {
  return error.response?.data?.message || "Something went wrong. Please try again.";
}

export async function registerUser(user) {
  try {
    const response = await axios.post(`${AUTH_SERVER}/register`, user);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}