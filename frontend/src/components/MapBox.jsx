import { Box } from "@mui/material";
import { GoogleMap, LoadScript, HeatmapLayer } from "@react-google-maps/api";
import React, { useState, useCallback } from 'react';

export default function MapBox(){

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent:'start',
    padding: "100px 0px 0px 0px",
    margin: "0px 0px 0px 0px"
  };
 
  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  const center = {
    lat: 40.7831,
    lng: -73.9712,
  };

  const [heatmapData, setHeatmapData] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);

  const heatmapOptions = {
    radius: 50, // Adjust this value to increase/decrease the size of the heatmap points
    opacity: 0.6 // Adjust the opacity if needed
  };

  const onLoad = useCallback((map) => {
    const google = window.google;
    const data = [
      { location: new google.maps.LatLng(40.7831, -73.9712), weight: 40 },
      { location: new google.maps.LatLng(40.7831, -73.9500), weight: 40 },
      { location: new google.maps.LatLng(40.7841, -73.9702), weight: 50 },
      { location: new google.maps.LatLng(40.7900, -73.9722), weight: 90 },
      { location: new google.maps.LatLng(40.8000, -73.9722), weight: 85 },
      { location: new google.maps.LatLng(40.7500, -73.9722), weight: 85 },
      { location: new google.maps.LatLng(40.7500, -73.9800), weight: 85 },
      { location: new google.maps.LatLng(40.7650, -73.9800), weight: 85 },
    ];
    setHeatmapData(data);
    setMapInstance(map);
  }, []);

  return (
    <Box
      sx={{
        p: "0px",
        m:'0px',
        // bgcolor: "yellow",
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
       <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['visualization']}
      sx={{ p: "0px", m: '0px' }}
    >
      <GoogleMap
        sx={{ p: "0px", m: '0px' }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={options}
        onLoad={onLoad}
      >
        {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} options={heatmapOptions} />}
      </GoogleMap>
    </LoadScript>
    </Box>
  );
};