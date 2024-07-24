import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Business, Place } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AppBar from "../components/HamburgerBox";
import PlanningMap from "../components/PlanningMap";
import Calendar from "../components/Calendar";
import TimePicker from "../components/Time";
import CustomToast from "../components/CustomToast"; 
import postService from "../services/postService";
import getTaxiZones from "../services/getTaxiZones";
import getBusinessUnits from "../services/getBusinessUnits";
import getVendors from "../services/getVendorDetails";

const Planning = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [authorisedVendors, setAuthorisedVendors] = useState([]);
  const [areas, setAreas] = useState("");
  const [LocationCords, setLocationCords] = useState(null);
  const [taxiZones, setTaxiZones] = useState(null);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!LocationCords) {
      console.error("LocationCords is null");
      return;
    }

    const formData = {
      unit: businessUnit,
      vendors: authorisedVendors,
      service_date: selectedDate.format("YYYY-MM-DD"),
      service_start_time: selectedStartTime.format("HH:mm:ss"),
      service_end_time: selectedEndTime.format("HH:mm:ss"),
      location_coords: `SRID=4326;POINT(${LocationCords.lng} ${LocationCords.lat})`,
      location_address: areas,
      revenue:'-25',
    };

    try {
      const result = await postService(formData);
      if (result) {
        navigate("/services", { state: { formData } });
      } else {
        setToastMessage("Failed to create service. Please try again.");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Failed to create service. Please try again.");
      setShowToast(true);
    }
  };

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

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
        const taxiZones = await getTaxiZones();
        setTaxiZones(taxiZones);

        const businessUnits = await getBusinessUnits();
        setBusinessUnits(businessUnits);

        const vendors = await getVendors();
        setVendors(vendors);
      } catch (error) {
        setToastMessage("Failed to fetch data. Please try again.");
        setShowToast(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate || !selectedStartTime || !selectedEndTime) {
        return;
      }

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const formattedStartTime = selectedStartTime.format("HH:mm:ss");

        const response = await api.get(
          `/get_busyness_scores/?datetime=${formattedDate}%20${formattedStartTime}`
        );

        let data = response.data;
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        const features = data.features;
        const filteredData = features.map((item) => ({
          geometry: item.geometry,
          score: item.Score,
        }));
        setCoordinates(filteredData);
      } catch (error) {
        setToastMessage("Failed to fetch busyness scores. Please try again.");
        setShowToast(true);
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
    zIndex: 10, // Ensure this is higher than the map
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
      <AppBar logout={logout} />
      <Grid
        sx={{
          width: "100vw",
          height: "100vh",
          m: "-10px",
          position: "absolute",
          zIndex: "0", // Lower z-index for the map
        }}
      >
        <PlanningMap
          initialHeatMapCor={coordinates}
          taxiZoneData={taxiZones}
          selectedZone={selectedZone}
          selectedCord={LocationCords}
          setSelectedCord={setLocationCords} 
        />
      </Grid>

      <Box sx={formContainerStyle}>
        <Typography variant="h5" sx={{ mb: 2, color: "orangered" }}>
          Plan A Service
        </Typography>

        <Calendar onDateChange={handleDateChange} sx={{ mb: 5 }} />

        <TimePicker name="Start Time" onTimeChange={handleStartTimeChange} />

        <TimePicker name="End Time" onTimeChange={handleEndTimeChange} />

        <Autocomplete
          fullWidth
          options={taxiZones ? taxiZones.features.map((zone) => zone.geometry.zone) : []}
          value={areas}
          onChange={(event, newValue) => {
            setAreas(newValue);
            const zoneDetails = taxiZones.features.find((zone) => zone.geometry.zone === newValue);
            setSelectedZone(zoneDetails);
          }}
          renderOption={(props, option) => (
            <li key={option} {...props}>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Areas"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Place />
                  </InputAdornment>
                ),
              }}
              sx={inputFieldStyle}
            />
          )}
        />

        <Autocomplete
          fullWidth
          options={businessUnits ? businessUnits.map((unit) => unit.permit_id) : []}
          value={businessUnit}
          onChange={(event, newValue) => {
            const newBusinessUnit = newValue
            setBusinessUnit(newBusinessUnit);
          }}
          renderOption={(props, option) => (
            <li key={option} {...props}>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Business Unit"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
              sx={inputFieldStyle}
            />
          )}
        />

        <FormControl fullWidth sx={inputFieldStyle}>
          <InputLabel id="vendors-label">Authorised Vendors</InputLabel>
          <Select
            labelId="vendors-label"
            multiple
            value={authorisedVendors}
            onChange={(event) => {
              const newVendor = event.target.value
              console.log(newVendor)
              setAuthorisedVendors(event.target.value);
            }}
            input={<OutlinedInput label="Authorised Vendors" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {vendors.map((vendor) => (
              <MenuItem key={vendor.licence_id} value={vendor.licence_id}>
                {vendor.licence_id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button sx={submitButtonStyle} variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </Box>

      {showToast && (
        <CustomToast
          closeToast={() => setShowToast(false)}
          message={toastMessage}
          sx={{ zIndex: 100 }} 
        />
      )}
    </Box>
  );
};

export default Planning;
