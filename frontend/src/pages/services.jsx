import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "../components/HamburgerBox";
import Map from "../components/MapBox";
import DataGrid from "../components/DataGrid";
import getServices from '../services/getServices';

function Services() {
  const [pastRows, setPastRows] = useState([]);
  const [presentRows, setPresentRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    getServices(setPastRows, setPresentRows, setLoading, setError);
  }, []);

  const buttonStyles = {
    textTransform: "none",
    backgroundColor: "#F6F6F6",
    borderRadius: "10px",
    padding: "1px 5px",
    marginRight: "8px",
    color: "black",
    borderColor: "transparent",
    "&:hover": {
      borderColor: "black",
      borderWidth: "2px",
      borderStyle: "solid",
    },
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "business", headerName: "Business", width: 90, editable: true },
    { field: "date", headerName: "Date", width: 150, editable: true },
    { field: "time", headerName: "Time", width: 180, editable: true },
    { field: "unit", headerName: "Unit", width: 100, editable: true },
    { field: "address", headerName: "Address", width: 280, editable: true },
  ];

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/planning");
  };

  const headerTypographyStyle = {
    color: "black",
    fontSize: "25px",
    alignContent: "center",
    pr: "10px"
  };

  const gridBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    height: "100%",
    width: "100%",
  };

  const dataGridBoxStyle = {
    overflowX: "auto",
    width: { xs: "90vw", sm: "95vw", md: "100%" },
    minWidth: 750,
  };

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      <AppBar />

      <Box sx={{ flexGrow: 1, paddingLeft: "20px", mt: "64px", height: "80vh" }}>
        <Box className="headertitle">
          <Typography sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}>
            Services
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ height: "100%", paddingBottom: "30px" }}>
          <Grid item xs={12} lg={8}>
            <Box sx={gridBoxStyle}>
              <Box sx={{ p: "10px 0px", display: "grid", gridTemplateColumns: "auto 1fr", alignSelf: "start" }}>
                <Typography sx={headerTypographyStyle}>
                  Planned Services
                </Typography>
                <Button startIcon={<AddIcon />} sx={buttonStyles} onClick={handleAddClick}>
                  Add
                </Button>
              </Box>
              <Box sx={dataGridBoxStyle}>
                <DataGrid rows={presentRows} columns={columns} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={4} sx={{ mb: '-150px', maxHeight: '1000px', width: '100%' }}>
            <Map />
          </Grid>

          <Grid item xs={12} lg={8} sx={{ marginTop: { xs: "100px", lg: "0px" } }}>
            <Box sx={gridBoxStyle}>
              <Box sx={{ p: "10px 0px", display: "grid", gridTemplateColumns: "auto 1fr", alignSelf: "start" }}>
                <Typography sx={headerTypographyStyle}>
                  Past Services
                </Typography>
              </Box>
              <Box sx={dataGridBoxStyle}>
                <DataGrid rows={pastRows} columns={columns} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Services;
