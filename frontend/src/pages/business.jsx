import { Button, Box, Typography, Grid } from "@mui/material";
import AppBar from "../components/HamburgerBox";
import Map from "../components/MapBox";
import DataGrid from "../components/DataGrid";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import { useState, useEffect } from "react";
import ImageCardBox from "../components/Card";

function createData(id, date, time, unit, vendor, address, EFT) {
  return { id, date, time, unit, vendor, address, EFT };
}

// const getColWidth = () => {
//   const screenWidth = window.innerWidth;
//   return {
//     id: 0.05 * screenWidth,
//     date: 0.15 * screenWidth,
//     time: 0.1 * screenWidth,
//     unit: 0.05 * screenWidth,
//     vendor: 0.1 * screenWidth,
//     address: 0.3 * screenWidth,
//     eft: 0.1 * screenWidth,
//   };
// }

export default function Business() {
  // const [colwidth, setColWidth] = useState(getColWidth());

  // useEffect(() => {
  //     const handleResize = () => {
  //         setColWidth(getColWidth());
  //     };

  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }, []);

  const buttonStyles = {
    textTransform: "none",
    backgroundColor: "#F6F6F6",
    borderRadius: "10px",
    padding: "1px 5px",
    marginRight: "8px",
    color: "black",
    borderColor: "transparent",
  };

  const rows = [
    createData(
      1,
      "Tue, 25/06/2024",
      "11:00 - 15:00",
      "AA08267",
      "C4049",
      "W. Durham Street New York, NY 10027",
      "4500"
    ),
    createData(
      2,
      "Wed, 26/06/2024",
      "09:00 - 13:00",
      "BB09268",
      "C4050",
      "E. Grand Street New York, NY 10002",
      "4800"
    ),
    createData(
      3,
      "Thu, 27/06/2024",
      "10:00 - 14:00",
      "CC10269",
      "C4051",
      "N. Main Street Brooklyn, NY 11201",
      "5000"
    ),
    createData(
      4,
      "Fri, 28/06/2024",
      "08:00 - 12:00",
      "DD11270",
      "C4052",
      "S. Park Avenue Bronx, NY 10451",
      "4700"
    ),
    createData(
      5,
      "Sat, 29/06/2024",
      "12:00 - 16:00",
      "EE12271",
      "C4053",
      "W. Market Street Queens, NY 11385",
      "4900"
    ),
    createData(
      6,
      "Sun, 30/06/2024",
      "07:00 - 11:00",
      "FF13272",
      "C4054",
      "E. River Street Staten Island, NY 10301",
      "5200"
    ),
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 120,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 90,
      editable: true,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 280,
      editable: true,
    },
    {
      field: "EFT",
      headerName: "EFT",
      width: 100,
      editable: true,
    },
  ];

  //   const columns = [
  //     { field: "id", headerName: "ID", width: colwidth.id },
  //     {
  //       field: "date",
  //       headerName: "Date",
  //       width: colwidth.date,
  //       editable: true,
  //     },
  //     {
  //       field: "time",
  //       headerName: "Time",
  //       width: colwidth.time,
  //       editable: true,
  //     },
  //     {
  //       field: "unit",
  //       headerName: "Unit",
  //       width: colwidth.unit,
  //       editable: true,
  //     },
  //     {
  //       field: "vendor",
  //       headerName: "Vendor",
  //       width: colwidth.vendor,
  //       editable: true,
  //     },
  //     {
  //       field: "address",
  //       headerName: "Address",
  //       width: colwidth.address,
  //       editable: true,
  //     },
  //     {
  //       field: "EFT",
  //       headerName: "EFT",
  //       width: colwidth.eft,
  //       editable: true,
  //     },
  //   ];

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/planning");
  };

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      {/* App Bar */}
      <AppBar></AppBar>

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

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <ImageCardBox
                Image={<StorefrontIcon style={{ color: "#f56c42" }} />}
                Title="Number of Business Units"
                Count="4"
              ></ImageCardBox>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ImageCardBox
                Image={<GroupIcon style={{ color: "#f56c42" }} />}
                Title="Number of Vendors"
                Count="6"
              ></ImageCardBox>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            height: "100%",
            width: { sm: "100%", lg: "70%" },
            paddingBottom: "30px",
          }}
        >
          {/* Planned Services */}
          <Grid item xs={12}>
            <Box
              sx={{
                // bgcolor: "red",
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
                  Business Units
                </Typography>
                {/* <ButtonBox></ButtonBox> */}
                <Button
                  variant="outlined"
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
                {" "}
                <DataGrid rows={rows} columns={columns}></DataGrid>
              </Box>
            </Box>
          </Grid>

          {/* Past Services */}
          <Grid
            sx={{
              marginTop: { xs: "100px", sm: "100px", md: "100px", lg: "0px" },
            }}
            item
            xs={12}
          >
            <Box
              sx={{
                // bgcolor: "red",
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
                  Authorised Vendors
                </Typography>
                <Button
                  variant="outlined"
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
                {" "}
                <DataGrid rows={rows} columns={columns}></DataGrid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
