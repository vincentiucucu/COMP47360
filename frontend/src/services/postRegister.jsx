import api from "../api";

export const postRegister = async (username, useremail, password) => {
  const route = "/api/signup";
  try {
    const response = await api.post(route, { username, useremail, password });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
