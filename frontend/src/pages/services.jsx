import { Button, Box, Typography, Grid } from "@mui/material";
import AppBar from "../components/HamburgerBox";
import Map from "../components/MapBox";
import DataGrid from "../components/DataGrid";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import api from '../api';

function createData(id, date, time, unit, business, address) {
  return { id, date, time, unit, business, address };
}

function Services() {
  const [pastRows, setPastRows] = useState([]);
  const [presentRows, setPresentRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      setLoading(true);
      try {
        const response = await api.get('api/service/');
        const data = response.data.results;
        const today = new Date();
        
        const pastServices = [];
        const presentServices = [];

        data.forEach((item, index) => {
          const serviceDate = new Date(item.service_date);
          const endTime = new Date(`${item.service_date}T${item.service_end_time}`);
          
          const row = createData(
            index + 1,
            serviceDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }),
            `${item.service_start_time} - ${item.service_end_time}`,
            `${item.unit}`,
            `${item.business}`,
            item.location_address
          );

          if (serviceDate < today || (serviceDate.toDateString() === today.toDateString() && endTime < today)) {
            pastServices.push(row);
          } else {
            presentServices.push(row);
          }
        });

        setPastRows(pastServices);
        setPresentRows(presentServices);

        console.log("Past Rows: ", pastServices);
        console.log("Present Rows: ", presentServices);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessUnits();
  }, []);

  // useEffect(() => {
  //   if (formData) {
  //     const newService = {
  //       business: formData.businessUnit,
  //       unit: formData.authorisedVendors,
  //       service_date: formData.selectedDate,
  //       service_start_time: formData.selectedStartTime,
  //       service_end_time: formData.selectedEndTime,
  //       location_address: formData.areas,
  //     };

  //     api.post('api/service/', newService)
  //     .then(response => {
        
  //     })
  //     .catch(error => {
  //       console.error("There was an error creating the new service!", error);
  //       setError(error);
  //     });    }
  // }, [formData]);

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
    {
      field: "business",
      headerName: "Business",
      width: 90,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 180,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 280,
      editable: true,
    },
  ];

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/planning");
  };

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      {/* App Bar */}
      <AppBar />

      {/* Layout */}
      <Box
        sx={{ flexGrow: 1, paddingLeft: "20px", mt: "64px", height: "80vh" }}
      >
        {/* Header */}
        <Box className="headertitle">
          <Typography
            sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}
          >
            Services
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ height: "100%", paddingBottom: "30px" }}
        >
          {/* Planned Services */}
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                height: "100%",
                width: "100%",
              }}
            >
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
              <Box
                sx={{
                  overflowX: "auto",
                  width: { xs: "90vw", sm: "95vw", md: "100%" },
                }}
              >
                <Box sx={{ minWidth: 750 }}>
                  <DataGrid rows={presentRows} columns={columns} />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{mb:'-150px', maxHeight:'1000px', width:'100px'}}>
            <Map />
          </Grid>

          {/* Past Services */}
          <Grid
            sx={{
              marginTop: { xs: "100px", sm: "100px", md: "100px", lg: "0px" },
            }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                height: "100%",
                width: "100%",
              }}
            >
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
                  Past Services
                </Typography>
              </Box>
              <Box
                sx={{
                  overflowX: "auto",
                  width: { xs: "90vw", sm: "95vw", md: "100%" },
                }}
              >
                <Box sx={{ minWidth: 750 }}>
                  <DataGrid rows={pastRows} columns={columns} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Services;
