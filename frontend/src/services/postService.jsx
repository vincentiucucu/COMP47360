import api from '../api';

const postService = async (formData) => {
  try {
    const response = await api.post("/api/service/", formData);
    if (response.status === 201) {
      console.log("Service created successfully:", response.data);
      return response.data;
    } else {
      console.error("Error creating service:", response.status, response.data);
      return null;
    }
  } catch (error) {
    console.error("Error creating service:", error);
    return null;
  }
};

export default postService;
