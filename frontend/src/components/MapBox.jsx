import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";
import L from "leaflet";
import "leaflet.heat";
import MapClickHandler from "./MapClickHandler";  // Import the new component

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
    fetch("/taxi_zone.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = Papa.parse(csvData, { header: true }).data;
        const geoJsonFeatures = parsedData
          .map((row) => {
            const feature = parseMultipolygon(row.geometry);
            if (feature) {
              feature.properties = {
                location_id: row.location_id,
              };
              return feature;
            }
            return null;
          })
          .filter((feature) => feature !== null);
        
        setCsvGeoJsonData({
          type: "FeatureCollection",
          features: geoJsonFeatures,
        });
      });
  }, []);

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

  useEffect(() => {
    if (initialHeatMapCor && initialHeatMapCor.length > 0) {
      const geoJsonFeatures = initialHeatMapCor.map((item) => ({
        type: "Feature",
        geometry: item.geometry,
      }));
      setGeoJsonData({
        type: "FeatureCollection",
        features: geoJsonFeatures,
      });

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
    <MapContainer
      center={center}
      zoom={zoom}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {csvGeoJsonData && (
        <GeoJSON data={csvGeoJsonData} />
      )}
      {heatmapData.length > 0 && <HeatmapLayer points={heatmapData} />}
      <MapClickHandler onClick={addZoomLocations} />  {/* Add the MapClickHandler component */}
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
