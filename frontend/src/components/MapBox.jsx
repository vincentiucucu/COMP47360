import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const HeatmapLayer = ({ points }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (points && points.length > 0) {
      const heat = L.heatLayer(points, { radius: 15, blur: 20, maxZoom: 18 }).addTo(map);
      return () => {
        map.removeLayer(heat);
      };
    }
  }, [map, points]);

  return null;
};

const MapClickHandler = ({ csvGeoJsonData, setLayersCleared, setHoverEnabled }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      let closestFeature = null;
      let minDistance = Infinity;

      csvGeoJsonData.features.forEach((feature) => {
        const [centerLng, centerLat] = feature.geometry.center_cor;
        const distance = Math.sqrt(Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2));

        if (distance < minDistance) {
          minDistance = distance;
          closestFeature = feature;
        }
      });

      if (closestFeature) {
        const [centerLng, centerLat] = closestFeature.geometry.center_cor;
        map.setView([centerLat, centerLng], 18);
        console.log(`Zone: ${closestFeature.geometry.zone}, Zone ID: ${closestFeature.geometry.zone_id}`);
      }
    },
    zoomend: () => {
      const currentZoom = map.getZoom();
      console.log("Current Zoom Level:", currentZoom);
      if (currentZoom >= 18) {
        setHoverEnabled(false);
        setLayersCleared(true);
      } else {
        setHoverEnabled(true);
        setLayersCleared(false);
      }
    },
  });
  return null;
};

const ZoneClickHandler = ({ selectedZone }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedZone) {
      const [centerLng, centerLat] = selectedZone.geometry.center_cor;
      map.setView([centerLat, centerLng], 18);
    }
  }, [selectedZone, map]);

  return null;
};

const MapBox = ({ initialHeatMapCor, taxiZoneData, selectedZone }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [layersCleared, setLayersCleared] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    if (initialHeatMapCor && initialHeatMapCor.length > 0) {
      const heatmapPoints = initialHeatMapCor.map((item) => [
        item.geometry.coordinates[1],
        item.geometry.coordinates[0],
        item.score,
      ]);
      setHeatmapData(heatmapPoints);
    }
  }, [initialHeatMapCor]);

  useEffect(() => {
    if (selectedZone && mapRef.current) {
      const [centerLng, centerLat] = selectedZone.geometry.center_cor;
      mapRef.current.setView([centerLat, centerLng], 18);
    }
  }, [selectedZone]);

  const onEachFeature = (feature, layer) => {
    if (hoverEnabled) {
      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            color: "#EE6C4D",
            dashArray: "",
            fillOpacity: 0.7,
            fillColor: "#EE6C4D",
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            color: "#3388ff",
            dashArray: "",
            fillOpacity: 0.2,
            fillColor: "#3388ff",
          });
        },
      });
    }
  };

  const center = [40.7831, -73.9712];
  const zoom = 13;

  const handleMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      whenCreated={handleMapLoad}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!layersCleared && taxiZoneData && <GeoJSON data={taxiZoneData} onEachFeature={onEachFeature} />}
      {!layersCleared && heatmapData.length > 0 && <HeatmapLayer points={heatmapData} />}
      {taxiZoneData && (
        <MapClickHandler
          csvGeoJsonData={taxiZoneData}
          setLayersCleared={setLayersCleared}
          setHoverEnabled={setHoverEnabled}
        />
      )}
      {selectedZone && <ZoneClickHandler selectedZone={selectedZone} />}
    </MapContainer>
  );
};

export default MapBox;
