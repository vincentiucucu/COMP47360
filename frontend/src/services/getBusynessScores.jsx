import api from "../api";

const getBusynessScores = async (date, time) => {
  try {
    const route = `/get_busyness_scores/?datetime=${date}%20${time}`;
    const response = await api.get(route);
    return response;
  } catch (error) {
    console.error('Error fetching busyness score:', error);
  }
}

export default getBusynessScores;
