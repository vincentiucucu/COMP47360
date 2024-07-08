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

export default function planning() {
  return (
    <Box>
      {/* App Bar */}
      <AppBar></AppBar>

      {/* Map  */}
      <Grid sx={{ width: "100%", height: "85vh" }}>
        <Map></Map>
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
