import Papa from "papaparse";

const getTaxiZones = async () => {
  const response = await fetch("/taxi_zone.csv");
  const csvData = await response.text();
  const parsedData = Papa.parse(csvData, { header: true }).data;
  const geoJsonFeatures = parsedData
    .map((row) => {
      const feature = parseMultipolygon(row.geometry);
      if (feature) {
        feature.properties = { location_id: row.location_id };
        return feature;
      }
      return null;
    })
    .filter((feature) => feature !== null);

  return { type: "FeatureCollection", features: geoJsonFeatures };
};

const parseMultipolygon = (data) => {
  if (!data) return null;

  const regex = /(-?\d+\.\d+)\s+(-?\d+\.\d+)/g;
  const multipolygonMatches = data.match(/\(\(\(.*?\)\)\)/g);

  if (!multipolygonMatches) return null;

  const coordinates = multipolygonMatches.map((polygon) => {
    const ringMatches = polygon.match(/\(\(.*?\)\)/g);
    return ringMatches.map((ring) => {
      const coords = [];
      let match;
      while ((match = regex.exec(ring)) !== null) {
        coords.push([parseFloat(match[1]), parseFloat(match[2])]);
      }
      return coords;
    });
  });

  return {
    type: "Feature",
    geometry: {
      type: "MultiPolygon",
      coordinates: coordinates,
    },
  };
};

export default getTaxiZones;
