import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from "../components/HamburgerBox";
import ServicesMap from "../components/ServicesMap";
import DataGrid from "../components/DataGrid";
import CustomToast from "../components/CustomToast";
import { toast } from 'react-toastify';
import getServicesLocations from '../services/getServicesLocations';
import getServices from '../services/getServices';
import deleteService from '../services/deleteService';

function Services() {
  const [pastRows, setPastRows] = useState([]);
  const [presentRows, setPresentRows] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;

  const fetchServices = async () => {
    try {
      await getServices(setPastRows, setPresentRows, setLoading, setError);
      await getServicesLocations(setCoordinates, setLoading, setError);
    } catch (error) {
      toast(<CustomToast header="ERROR" text="Failed to fetch services data. Please try again." />);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddClick = () => {
    navigate("/planning");
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteService(deleteId);
      await fetchServices();
      toast(<CustomToast header="SUCCESS" text="Service deleted successfully." />);
    } catch (error) {
      toast(<CustomToast header="ERROR" text="Failed to delete service. Please try again." />);
    } finally {
      setOpenDialog(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "business", headerName: "Business", width: 90, editable: true },
    { field: "date", headerName: "Date", width: 130, editable: true },
    { field: "time", headerName: "Time", width: 150, editable: true },
    { field: "unit", headerName: "Unit", width: 100, editable: true },
    { field: "vendors", headerName: "Vendors", width: 180, editable: true },
    { field: "address", headerName: "Address", width: 170, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(params.row.service_id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const buttonStyles = {
    textTransform: "none",
    backgroundColor: "#F6F6F6",
    borderRadius: "10px",
    padding: "8px 16px",
    marginRight: "8px",
    color: "black",
    borderColor: "transparent",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#E0E0E0",
      borderColor: "black",
      borderStyle: "solid",
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
      transform: "scale(1.02)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 3px rgba(255, 105, 135, 0.5)",
    },
  };

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

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
      <AppBar logout={logout} />

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
            <ServicesMap coordinates={coordinates} />
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this service?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Services;
