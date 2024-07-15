import api from "../api";

export const postService = async (servicesModel) => {
  const route = "/api/signup";
  try {
    const response = await api.post(route, { servicesModel });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};