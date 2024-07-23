// Business.jsx
import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid, CircularProgress } from "@mui/material";
import AppBar from "../components/HamburgerBox";
import DataGrid from "../components/DataGrid";
import { useNavigate, Navigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import ImageCardBox from "../components/ImageCardBox";
import getBusinessUnits from "../services/getBusinessUnits";
import getVendors from "../services/getVendorDetails";
import postBusinessUnit from "../services/postBusinessUnit";
import postVendor from "../services/postVendor";
import AddDialog from "../components/AddDialog";
import CustomToast from "../components/CustomToast";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const buttonStyles = {
  textTransform: "none",
  backgroundColor: "#F6F6F6",
  borderRadius: "10px",
  padding: "1px 5px",
  marginRight: "8px",
  color: "black",
  borderColor: "transparent",
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
      headerName: "Licence Expiry Date",
      width: 150,
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
      headerName: "Vendor Phone Number",
      width: 150,
      editable: true,
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

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      {/* App Bar */}
      <AppBar logout={logout}/>

      {/* Layout */}
      <Box
        sx={{ flexGrow: 1, paddingLeft: "20px", mt: "64px", height: "80vh" }}
      >
        {/* Header */}
        <Box className="headertitle">
          <Typography
            sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}
          >
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
              {/* Business Units */}
              <Grid item xs={12}>
                <Box sx={boxStyles}>
                  <Box
                    sx={{
                      p: "10px 0px",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignSelf: "start",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        pr: "10px",
                        fontSize: "25px",
                        alignContent: "center",
                      }}
                    >
                      Business Units
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={buttonStyles}
                      onClick={() => handleAddClick("business")}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={gridStyles.overflow}>
                    <DataGrid rows={businessRows} columns={businessColumns} />
                  </Box>
                </Box>
              </Grid>

              {/* Authorised Vendors */}
              <Grid sx={gridStyles.item} item xs={12}>
                <Box sx={boxStyles}>
                  <Box
                    sx={{
                      p: "10px 0px",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignSelf: "start",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        pr: "10px",
                        fontSize: "25px",
                        alignContent: "center",
                      }}
                    >
                      Authorised Vendors
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={buttonStyles}
                      onClick={() => handleAddClick("vendor")}
                    >
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

      <AddDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAdd={handleDialogAdd}
        type={dialogType}
      />
    </Box>
  );
}
