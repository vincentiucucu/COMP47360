import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Business, People, Place } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AppBar from "../components/HamburgerBox";
import MapBox from "../components/MapBox";
import Calendar from "../components/Calendar";
import TimePicker from "../components/Time";
import postService from "../services/postService";

const Planning = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [authorisedVendors, setAuthorisedVendors] = useState("");
  const [areas, setAreas] = useState("");
  const [LocationCords, setLocationCords] = useState(null);
  const navigate = useNavigate();

  const addLocationCords = (coords) => {
    setLocationCords(coords);
  };

  const handleClick = async () => {
    const formData = {
      business: parseInt(businessUnit, 10),
      unit: parseInt(authorisedVendors, 10),
      service_date: selectedDate.format("YYYY-MM-DD"),
      service_start_time: selectedStartTime.format("HH:mm:ss"),
      service_end_time: selectedEndTime.format("HH:mm:ss"),
      location_coords: `${LocationCords.lat},${LocationCords.lng}`,
      location_address: areas,
    };

    console.log(formData);

    const result = await postService(formData);
    if (result) {
      navigate("/services", { state: { formData } });
    }
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = import.meta.env.VITE_API_URL;
        if (selectedDate && selectedStartTime && selectedEndTime) {
          const response = await api.get(`/api/busyness_score/?datetime=${selectedDate.format("YYYY-MM-DD")}%20${selectedStartTime.format("HH:mm:ss")}`);
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          const textData = await response.text();
          let data;

          try {
            data = JSON.parse(textData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
          }

          if (typeof data === "string") {
            data = JSON.parse(data);
          }
          const features = data.features;
          const filteredData = features.map((item) => ({
            geometry: item.geometry,
            score: item.Score,
          }));
          setCoordinates(filteredData);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, selectedStartTime, selectedEndTime]);

  const formContainerStyle = {
    top: "75px",
    left: "20px",
    height: "auto",
    width: "20vw",
    minWidth: "250px",
    borderRadius: "20px",
    p: 3,
    position: "absolute",
    zIndex: 1,
    backdropFilter: "blur(30px)",
  };

  const inputFieldStyle = {
    mb: 2,
  };

  const submitButtonStyle = {
    color: "white",
    bgcolor: "orangered",
    display: "flex",
    justifyContent: "center",
    mt: "10px",
    textAlign: "center",
    width: "100%",
  };

  return (
    <Box>
      <AppBar />
      <Grid
        sx={{
          width: "100vw",
          height: "100vh",
          m: "-10px",
          position: "absolute",
          zIndex: "0",
        }}
      >
        <MapBox initialHeatMapCor={coordinates} addZoomLocations={addLocationCords} />
      </Grid>

      <Box sx={formContainerStyle}>
        <Typography variant="h5" sx={{ mb: 2, color: "orangered" }}>
          Plan A Service
        </Typography>

        <Calendar onDateChange={handleDateChange} sx={{ mb: 5 }} />

        <TimePicker name="Start Time" onTimeChange={handleStartTimeChange} />

        <TimePicker name="End Time" onTimeChange={handleEndTimeChange} />

        <TextField
          fullWidth
          label="Areas"
          value={areas}
          onChange={(e) => setAreas(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Place />
              </InputAdornment>
            ),
          }}
          sx={inputFieldStyle}
        />

        <TextField
          fullWidth
          label="Business Unit"
          value={businessUnit}
          onChange={(e) => setBusinessUnit(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business />
              </InputAdornment>
            ),
          }}
          sx={inputFieldStyle}
        />

        <TextField
          fullWidth
          label="Authorised Vendors"
          value={authorisedVendors}
          onChange={(e) => setAuthorisedVendors(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <People />
              </InputAdornment>
            ),
          }}
          sx={inputFieldStyle}
        />

        <Button
          sx={submitButtonStyle}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Planning;
