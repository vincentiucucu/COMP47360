import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid, IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from "../components/HamburgerBox";
import DataGrid from "../components/DataGrid";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import ImageCardBox from "../components/ImageCardBox";
import getBusinessUnits from "../services/getBusinessUnits";
import getVendors from "../services/getVendorDetails";
import postBusinessUnit from "../services/postBusinessUnit";
import postVendor from "../services/postVendor";
import deleteBusinessUnit from "../services/deleteBusinessUnit";
import deleteVendor from "../services/deleteVendor";
import AddDialog from "../components/AddDialog";
import CustomToast from "../components/CustomToast";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const boxStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  height: "100%",
  width: "100%",
};

const gridStyles = {
  container: {
    height: "100%",
    width: { sm: "100%", lg: "70%" },
    paddingBottom: "30px",
  },
  item: {
    marginTop: { xs: "100px", sm: "100px", md: "100px", lg: "0px" },
  },
  overflow: {
    overflowX: "auto",
    width: { xs: "90vw", sm: "95vw", md: "80vw" },
  },
};

export default function Business() {
  const [businessRows, setBusinessRows] = useState([]);
  const [vendorRows, setVendorRows] = useState([]);
  const [nextBusinessId, setNextBusinessId] = useState(1);
  const [nextVendorId, setNextVendorId] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null); 
  const [deleteType, setDeleteType] = useState(""); 
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const businessData = await getBusinessUnits();
        const vendorData = await getVendors();
        setBusinessRows(businessData);
        setVendorRows(vendorData);
        setNextBusinessId(businessData.length + 1);
        setNextVendorId(vendorData.length + 1);
      } catch (error) {
        toast(<CustomToast />);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const businessColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "business", headerName: "Business", width: 150, editable: true },
    { field: "unit_name", headerName: "Unit Name", width: 150, editable: true },
    { field: "permit_id", headerName: "Permit ID", width: 120, editable: true },
    {
      field: "permit_expiry_date",
      headerName: "Permit Expiry Date",
      width: 150,
      editable: true,
    },
    { field: "unit_type", headerName: "Unit Type", width: 100, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(params.row.permit_id, "business")}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const vendorColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "business", headerName: "Business", width: 150, editable: true },
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      width: 150,
      editable: true,
    },
    {
      field: "licence_id",
      headerName: "Licence ID",
      width: 120,
      editable: true,
    },
    {
      field: "licence_expiry_date",
      headerName: "Expiry Date",
      width: 130,
      editable: true,
    },
    {
      field: "vendor_email",
      headerName: "Vendor Email",
      width: 200,
      editable: true,
    },
    {
      field: "vendor_phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(params.row.licence_id, "vendor")}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleAddClick = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleAddBusinessUnit = async (newBusinessUnit) => {
    setLoading(true);
    try {
      const addedBusinessUnit = await postBusinessUnit(newBusinessUnit);
      setBusinessRows([...businessRows, { ...addedBusinessUnit, id: nextBusinessId }]);
      setNextBusinessId(nextBusinessId + 1);
    } catch (error) {
      toast(<CustomToast />);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVendor = async (newVendor) => {
    setLoading(true);
    try {
      const addedVendor = await postVendor(newVendor);
      setVendorRows([...vendorRows, { ...addedVendor, id: nextVendorId }]);
      setNextVendorId(nextVendorId + 1);
    } catch (error) {
      toast(<CustomToast />);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogAdd = (data) => {
    if (dialogType === "business") {
      handleAddBusinessUnit(data);
    } else if (dialogType === "vendor") {
      handleAddVendor(data);
    }
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (id, type) => {
    setDeleteId(id);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      if (deleteType === "business") {
        await deleteBusinessUnit(deleteId);
        setBusinessRows((prevRows) => prevRows.filter((row) => row.permit_id !== deleteId));
      } else if (deleteType === "vendor") {
        await deleteVendor(deleteId);
        setVendorRows((prevRows) => prevRows.filter((row) => row.licence_id !== deleteId));
      }
      toast(<CustomToast header="SUCCESS" text="Deleted successfully." />);
    } catch (error) {
      toast(<CustomToast header="ERROR" text="Failed to delete. Please try again." />);
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      <AppBar logout={logout} />

      <Box sx={{ flexGrow: 1, paddingLeft: "20px", mt: "64px", height: "80vh" }}>
        <Box className="headertitle">
          <Typography sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}>
            My Business
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={3}>
                  <ImageCardBox
                    Image={
                      <StorefrontIcon
                        style={{ color: "#f56c42", width: "35px", height: "35px" }}
                      />
                    }
                    Title="Number of Business Units"
                    Count={businessRows.length.toString()}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <ImageCardBox
                    Image={
                      <GroupIcon
                        style={{ color: "#f56c42", width: "35px", height: "35px" }}
                      />
                    }
                    Title="Number of Vendors"
                    Count={vendorRows.length.toString()}
                  />
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2} sx={gridStyles.container}>
              <Grid item xs={12}>
                <Box sx={boxStyles}>
                  <Box sx={{ p: "10px 0px", display: "grid", gridTemplateColumns: "auto 1fr", alignSelf: "start" }}>
                    <Typography sx={{ color: "black", pr: "10px", fontSize: "25px", alignContent: "center" }}>
                      Business Units
                    </Typography>
                    <Button startIcon={<AddIcon />} sx={buttonStyles} onClick={() => handleAddClick("business")}>
                      Add
                    </Button>
                  </Box>
                  <Box sx={gridStyles.overflow}>
                    <DataGrid rows={businessRows} columns={businessColumns} />
                  </Box>
                </Box>
              </Grid>

              <Grid sx={gridStyles.item} item xs={12}>
                <Box sx={boxStyles}>
                  <Box sx={{ p: "10px 0px", display: "grid", gridTemplateColumns: "auto 1fr", alignSelf: "start" }}>
                    <Typography sx={{ color: "black", pr: "10px", fontSize: "25px", alignContent: "center" }}>
                      Authorised Vendors
                    </Typography>
                    <Button startIcon={<AddIcon />} sx={buttonStyles} onClick={() => handleAddClick("vendor")}>
                      Add
                    </Button>
                  </Box>
                  <Box sx={gridStyles.overflow}>
                    <DataGrid rows={vendorRows} columns={vendorColumns} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <AddDialog open={dialogOpen} handleClose={handleDialogClose} handleAdd={handleDialogAdd} type={dialogType} />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete {deleteType === "business" ? "Business Unit" : "Vendor"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this {deleteType === "business" ? "business unit" : "vendor"}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
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
