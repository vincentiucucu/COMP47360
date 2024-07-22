import api from "../api";

export const getPastServices = async () => {
  const route = "/api/services";
  try {
    const response = await api.get(route);
    return response;
  } catch (error) {
    console.error("Error fetching past services:", error);
    throw error;
  }
};