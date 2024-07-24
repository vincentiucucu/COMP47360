import api from '../api';

const getServicesLocations = async (setCoordinates, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await api.get("/api/service/geojson/");
    const data = response.data.features;
    const coordinates = data.map((feature) => ({
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0]
    }));

    setCoordinates(coordinates);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching services:", error);
    setError(error);
    setLoading(false);
  }
};

export default getServicesLocations;
