import api from '../api';

const deleteService = async (id) => {
  const response = await api.delete(`/api/business_unit/${id}`);
  return response.data;
};

export default deleteService;
