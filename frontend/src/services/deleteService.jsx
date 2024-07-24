import api from '../api';

const deleteService = async (id) => {
  const response = await api.delete(`/api/service/${id}`);
  return response.data;
};

export default deleteService;
