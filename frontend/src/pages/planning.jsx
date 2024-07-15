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
import Papa from "papaparse";

export default function Planning() {
  const [jsonData, setJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/Excel/Manhattan_Street_Cord.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const data = [];
            results.data.slice(0, 10000).forEach((row) => {
              const match = row.street_centroid.match(
                /POINT \(([^ ]+) ([^)]+)\)/
              );
              if (match) {
                data.push({
                  lat: parseFloat(match[2]),
                  lng: parseFloat(match[1]),
                });
              }
            });
            setFilteredData(data);
          },
          error: (error) => {
            console.error("Error parsing CSV file: ", error);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV file: ", error);
      });
  }, []);

  useEffect(() => {
    if (filteredData.length > 0) {
      console.log(filteredData);
    }
  }, [filteredData]);

  return (
    <Box>
      {/* App Bar */}
      <AppBar />

      {/* Map  */}
      <Grid sx={{ width: "100%", height: "85vh" }}>
        {filteredData.length > 0 && <Map HeatMapCor={filteredData} />}
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

        <Calendar sx={{ mb: 5 }} />

        <TimePicker name="Start Time" />

        <TimePicker name="End Time" />

        <TextField
          fullWidth
          label="Business Unit"
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Place />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
