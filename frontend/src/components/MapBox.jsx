import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box } from "@mui/material";

const MapBox = ({ initialHeatMapCor }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [heatMapData, setHeatMapData] = useState([]);
  const [isDataValid, setIsDataValid] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: 'start',
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

  const center = { lat: 40.7831, lng: -73.9712 };
  const zoom = 13;

  // Ensure initialHeatMapCor is an array with the correct structure
  useEffect(() => {
    if (Array.isArray(initialHeatMapCor) && initialHeatMapCor.length > 0) {
      const validData = initialHeatMapCor.every(point => 'lat' in point && 'lng' in point);
      setIsDataValid(validData);
      if (validData) {
        setHeatMapData(initialHeatMapCor);
      }
    }
  }, [initialHeatMapCor]);

  return (
    <Box sx={{
      p: "0px",
      m: '0px',
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey, libraries: ['visualization'] }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={options}
        heatmap={{
          positions: isDataValid ? heatMapData : [],
          options: { radius: 50, opacity: 1 },
        }}
        yesIWantToUseGoogleMapApiInternals
      />
    </Box>
  );
};

export default MapBox;
