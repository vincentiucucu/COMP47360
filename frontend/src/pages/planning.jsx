import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import MapBox from "../components/MapBox";
import AppBar from "../components/HamburgerBox";
import { Business, People, Place } from "@mui/icons-material";
import Calendar from "../components/Calendar";
import TimePicker from "../components/Time";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Planning() {
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
      business: parseInt(businessUnit, 10), // Ensure this is an integer
      unit: parseInt(authorisedVendors, 10), // Ensure this is an integer
      service_date: selectedDate.format("YYYY-MM-DD"), // Adjust the date format
      service_start_time: selectedStartTime.format("HH:mm:ss"), // Adjust the time format
      service_end_time: selectedEndTime.format("HH:mm:ss"), // Adjust the time format
      location_coords: `${LocationCords.lat},${LocationCords.lng}`, // Format to "lat,lng"
      location_address: areas, // Assuming areas is the address
    };
  
    console.log(formData);
  
    try {
      const response = await api.post('/api/service/', formData);
      if (response.status === 201) {
        console.log("Service created successfully:", response.data);
        navigate("/services", { state: { formData } });
      } else {
        console.error("Error creating service:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleStartTimeChange = (time) => {
    console.log(time?.format("HH:mm"));
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    console.log(time?.format("HH:mm"));
    setSelectedEndTime(time);
  };

  const handleDateChange = (date) => {
    console.log(date?.format("ddd, DD/MM/YYYY"));
    setSelectedDate(date);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = import.meta.env.VITE_API_URL;
        console.log(host)
        if(selectedDate && selectedStartTime && selectedEndTime)
        {
          console.log(`${host}get_busyness_scores/?datetime=${selectedDate.format("YYYY-MM-DD")}%20${selectedStartTime.format("HH:mm:ss")}`);
          const response = await api.get(`/api/busyness_score/?datetime=${selectedDate.format("YYYY-MM-DD")}%20${selectedStartTime.format("HH:mm:ss")}`);
          console.log(response)
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          const textData = await response.text(); // Fetch as text
          let data;
          console.log(data)

          try {
            data = JSON.parse(textData); 
            console.log(data)

          } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
          }

          if (typeof data === "string") {
            data = JSON.parse(data);
            console.log(data)
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

  useEffect(() => {
    console.log(coordinates); 
  }, [coordinates]);

  return (
    <Box>
      <AppBar />
      <Grid
        sx={{
          width: "100vw",
          height: "100vh",
          m: '-10px',
          position:'absolute',
          zIndex:'0'
        }}
      >
        <MapBox initialHeatMapCor={coordinates} addZoomLocations={addLocationCords}/>
      </Grid>

      <Box
        sx={{
          top: "75px",
          left: "20px",
          height: "auto",
          width: "20vw",
          minWidth: "250px",
          bgcolor: "white",
          borderRadius: "20px",
          p: 3,
          position:'absolute',
          zIndex:'1'
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
          sx={{ mb: 2 }}
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
