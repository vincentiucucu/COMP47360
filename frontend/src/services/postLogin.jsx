import api from "../api";

export const postLogin = async (useremail, password) => {
  const route = "/api/login";
  try {
    const response = await api.post(route, { useremail, password });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
