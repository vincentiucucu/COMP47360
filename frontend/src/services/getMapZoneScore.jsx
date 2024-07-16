import api from "../api";

export const getRecommendations = async (zone, datetime) => {
  try {
    const route = "/get_recommendations/";
    const response = await api.get(route, {
      params: {
        zone: zone,
        datetime: datetime
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
}