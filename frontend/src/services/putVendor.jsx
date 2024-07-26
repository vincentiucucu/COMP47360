import api from '../api';

const putBusinessUnit = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/vendor/${id}/`, updatedData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error updating business unit:', error);
    throw error;
  }
};

export default putBusinessUnit;
