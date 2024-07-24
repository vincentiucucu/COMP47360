import api from '../api';

function createData(id, date, time, unit, business, address) {
  return { id, date, time, unit, business, address };
}

const fetchBusinessUnits = async (setPastRows, setPresentRows, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await api.get('/api/service/');
    const data = response.data.results;
    const today = new Date();
    
    const pastServices = [];
    const presentServices = [];

    data.forEach((item, index) => {
      const serviceDate = new Date(item.service_date);
      const endTime = new Date(`${item.service_date}T${item.service_end_time}`);
      
      const row = createData(
        index + 1,
        serviceDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }),
        `${item.service_start_time} - ${item.service_end_time}`,
        `${item.unit}`,
        `${item.business}`,
        item.location_address
      );

      if (serviceDate < today || (serviceDate.toDateString() === today.toDateString() && endTime < today)) {
        pastServices.push(row);
      } else {
        presentServices.push(row);
      }
    });

    setPastRows(pastServices);
    setPresentRows(presentServices);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

export default fetchBusinessUnits;
