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
  DialogTitle,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppBar from "../components/HamburgerBox";
import ServicesMap from "../components/ServicesMap";
import DataGridDemo from "../components/DataGrid";
import Calendar from "../components/Calendar";
import CustomToast from "../components/CustomToast";
import Time from "../components/Time";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import getServicesLocations from "../services/getServicesLocations";
import getServices from "../services/getServices";
import deleteService from "../services/deleteService";
import putService from "../services/putService";

function Services() {
  const [pastRows, setPastRows] = useState([]);
  const [presentRows, setPresentRows] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;

  const fetchServices = async () => {
    setLoading(true);
    try {
      await getServices(setPastRows, setPresentRows, setLoading, setError);
      await getServicesLocations(setCoordinates, setLoading, setError);
    } catch (error) {
      toast(
        <CustomToast
          header="ERROR"
          text="Failed to fetch services data. Please try again."
        />
      );
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      await deleteService(deleteId);
      await fetchServices();
      toast(
        <CustomToast header="SUCCESS" text="Service deleted successfully." />
      );
    } catch (error) {
      toast(
        <CustomToast
          header="ERROR"
          text="Failed to delete service. Please try again."
        />
      );
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const handleEditClick = (row) => {
    const [startTime, endTime] = row.time.split(" - ");
    setEditRow({ ...row, date: dayjs(row.date), service_start_time: dayjs(startTime, "HH:mm:ss"), service_end_time: dayjs(endTime, "HH:mm:ss") });
    setEditDialogOpen(true);
  };

  const handleEditChange = (field, value) => {
    setEditRow((prevRow) => {
      return {
        ...prevRow,
        [field]: value,
      };
    });
  };

  const handleEditConfirm = async () => {
    setLoading(true);
    const {
      service_id,
      business,
      date,
      service_start_time,
      service_end_time,
      unit,
      vendors_id,
      address,
      location,
      time
    } = editRow;

    const updatedData = {
      service_date: date.format("YYYY-MM-DD"),
      service_start_time: service_start_time.format("HH:mm:ss"),
      service_end_time: service_end_time.format("HH:mm:ss"),
      location_coords: location,
      location_address: address,
      revenue: "-9726.5",
      unit: unit,
      vendors: vendors_id,
    };

    try {
      await putService(service_id, updatedData);
      await fetchServices();
      toast(
        <CustomToast header="SUCCESS" text="Service updated successfully." />
      );
      setEditDialogOpen(false);
    } catch (error) {
      toast(
        <CustomToast
          header="ERROR"
          text="Failed to update service. Please try again."
        />
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "service_id", headerName: "ID", width: 90 },
    { field: "business", headerName: "Business", width: 150, editable: false },
    { field: "date", headerName: "Date", width: 150, editable: false },
    { field: "time", headerName: "Time", width: 150, editable: false },
    { field: "unit", headerName: "Unit", width: 150, editable: false },
    { field: "vendors", headerName: "Vendors", width: 150, editable: false },
    { field: "address", headerName: "Address", width: 200, editable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteClick(params.row.service_id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
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
    navigate("/login");
  }

  const headerTypographyStyle = {
    color: "black",
    fontSize: "25px",
    alignContent: "center",
    pr: "10px",
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

      <Box
        sx={{ flexGrow: 1, paddingLeft: "20px", mt: "64px", height: "80vh" }}
      >
        <Box className="headertitle">
          <Typography
            sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}
          >
            Services
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{ height: "100%", paddingBottom: "30px" }}
          >
            <Grid item xs={12} lg={8}>
              <Box sx={gridBoxStyle}>
                <Box
                  sx={{
                    p: "10px 0px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    alignSelf: "start",
                  }}
                >
                  <Typography sx={headerTypographyStyle}>
                    Planned Services
                  </Typography>
                  <Button
                    startIcon={<AddIcon />}
                    sx={buttonStyles}
                    onClick={handleAddClick}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={dataGridBoxStyle}>
                  <DataGridDemo rows={presentRows} columns={columns} />
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              lg={4}
              sx={{ mb: "-150px", maxHeight: "1000px", width: "100%" }}
            >
              <ServicesMap coordinates={coordinates} />
            </Grid>

            <Grid
              item
              xs={12}
              lg={8}
              sx={{ marginTop: { xs: "100px", lg: "0px" } }}
            >
              <Box sx={gridBoxStyle}>
                <Box
                  sx={{
                    p: "10px 0px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    alignSelf: "start",
                  }}
                >
                  <Typography sx={headerTypographyStyle}>
                    Past Services
                  </Typography>
                </Box>
                <Box sx={dataGridBoxStyle}>
                  <DataGridDemo rows={pastRows} columns={columns} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this service?
          </DialogContentText>
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Calendar
            label="Date"
            value={editRow?.date || dayjs()}
            onDateChange={(newValue) => handleEditChange("date", newValue)}
          />
          <Time
            name="Start Time"
            onTimeChange={(newValue) => handleEditChange("service_start_time", newValue)}
          />
          <Time
            name="End Time"
            onTimeChange={(newValue) => handleEditChange("service_end_time", newValue)}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editRow?.address || ""}
            onChange={(e) => handleEditChange("address", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Services;
