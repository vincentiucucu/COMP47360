import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Map from "../components/MapBox";
import AppBar from "../components/HamburgerBox";
import { Business, People, Place } from "@mui/icons-material";
import Calendar from "../components/Calendar";
import TimePicker from "../components/Time";
import { useState, useEffect } from "react";
// import { getRecommendations } from "../services/getMapZoneScore";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Planning() {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getRecommendations(3, "2024-07-16 12:00:00");
  //       const filteredData = response.map(item => ({
  //         lat: item.Latitude,
  //         lng: item.Longitude,
  //       }));
  //       setCoordinates(filteredData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //  console.log(coordinates)
  // }, [coordinates]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../public/heatmapZones.json");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        const filteredData = data.map((item) => ({
          lat: item.Latitude,
          lng: item.Longitude,
        }));
        setCoordinates(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [authorisedVendors, setAuthorisedVendors] = useState("");
  const [areas, setAreas] = useState("");

  const handleStartTimeChange = (time) => {
    console.log(time);
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    console.log(time);
    setSelectedEndTime(time);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  const handleClick = () => {

    const formData = {
      selectedDate,
      selectedStartTime,
      selectedEndTime,
      businessUnit,
      authorisedVendors,
      areas,
    };
    console.log(formData)
    navigate("/services", { state: { formData } });
  };

  return (
    <Box>
      {/* App Bar */}
      <AppBar />

      {/* Map  */}
      <Grid sx={{ width: "100%", height: "100vh" }}>
        {coordinates.length > 0 && <Map initialHeatMapCor={coordinates} />}
      </Grid>

      {/* Planning Card */}
      <Box
        sx={{
          position: "absolute",
          top: "75px",
          left: "20px",
          height: "auto",
          width: "20vw",
          minWidth: "250px",
          bgcolor: "white",
          borderRadius: "20px",
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "orangered" }}>
          Plan A Service
        </Typography>

        <Calendar onDateChange={handleDateChange} sx={{ mb: 5 }} />

        <TimePicker name="Start Time" onTimeChange={handleStartTimeChange} />

        <TimePicker name="End Time" onTimeChange={handleEndTimeChange} />

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
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
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
        />
        <Button
          sx={{
            color: "white",
            bgcolor: "orangered",
            display: "flex",
            justifyContent: "center",
            mt: "10px",
            textAlign: "center",
            width: "100%",
          }}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
