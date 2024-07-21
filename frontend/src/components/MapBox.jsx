import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import MapClickHandler from "./MapClickHandler";
import getTaxiZones from "../services/getTaxiZones";

const HeatmapLayer = ({ points }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (points && points.length > 0) {
      const heat = L.heatLayer(points, { radius: 15, blur: 20, max: 10 }).addTo(map);
      return () => {
        map.removeLayer(heat);
      };
    }
  }, [map, points]);

  return null;
};

const MapBox = ({ initialHeatMapCor, addZoomLocations }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [csvGeoJsonData, setCsvGeoJsonData] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTaxiZones();
      setCsvGeoJsonData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialHeatMapCor && initialHeatMapCor.length > 0) {
      const geoJsonFeatures = initialHeatMapCor.map((item) => ({
        type: "Feature",
        geometry: item.geometry,
      }));
      setGeoJsonData({ type: "FeatureCollection", features: geoJsonFeatures });

      const heatmapPoints = initialHeatMapCor.map((item) => [
        item.geometry.coordinates[1],
        item.geometry.coordinates[0],
        10,
      ]);
      setHeatmapData(heatmapPoints);
    }
  }, [initialHeatMapCor]);

  const center = [40.7831, -73.9712];
  const zoom = 13;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {csvGeoJsonData && <GeoJSON data={csvGeoJsonData} />}
      {heatmapData.length > 0 && <HeatmapLayer points={heatmapData} />}
      <MapClickHandler onClick={addZoomLocations} />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lng]}>
          <Popup>
            Score: {marker.score} <br />
            Distance to Event: {marker.distance} meters
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapBox;
