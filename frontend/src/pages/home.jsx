import React, { useState } from "react";
import { Box, Button, Grid, Typography, Link } from "@mui/material";
import logo from "../assets/Images/Logo/VendTune_Logo.png";
import dashboard from "../assets/Images/StockImages/DashboardImg.png";
import business from "../assets/Images/StockImages/BusinessImg.png";
import services from "../assets/Images/StockImages/ServicesImg.png";

const buttonStyle = {
  textAlign: "center",
  p: "10px",
  transition: "background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    background: "linear-gradient(to right, transparent, #ff4500, transparent)",
    color: "black",
    boxShadow: "0px 4px 20px #ff4500",
    "& .MuiTypography-root": {
      color: "black",
    },
  },
};

const Main = () => {
  const [image, setImage] = useState(dashboard);

  const handleButton = (text) => {
    if (text === "Dashboard") {
      setImage(dashboard);
    } else if (text === "Business") {
      setImage(business);
    } else {
      setImage(services);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        backgroundColor: "#333333",
        color: "white",
        height: "100%",
        width: "100vw",
        p: "0px",
        ml: "-10px",
        mr: "-10px",
        mb: "-10px",
      }}
    >
      <Grid container spacing={2} sx={{ pb: "10px", mb: "10px", pt:'10px' }}>
        <Grid item xs={6} sx={{ textAlign: "start" }}>
          <Box sx={{ display: "flex", textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "end" }}>
          <Link
            href="/login"
            color="inherit"
            sx={{ textDecoration: "none", marginRight: "20px" }}
          >
            Sign in →
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "4rem",
              },
            }}
          >
            Mobile Food Vending Made Easy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
                md: "1.5rem",
              },
            }}
          >
            A Data-Driven Approach to Managing Your Mobile Food Vending Business
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            item
            xs={12}
            sx={buttonStyle}
            onClick={() => handleButton("Dashboard")}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.75rem",
                },
              }}
            >
              High-level Dashboard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "20px",
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.125rem",
                },
              }}
            >
              Track key metrics and monitor your business' growth
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={buttonStyle}
            onClick={() => handleButton("Business")}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.75rem",
                },
              }}
            >
              Business Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "20px",
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.125rem",
                },
              }}
            >
              Add and monitor business units and authorized vendors
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={buttonStyle}
            onClick={() => handleButton("Location")}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.75rem",
                },
              }}
            >
              Location Recommendation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "20px",
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.125rem",
                },
              }}
            >
              Plan your set-up location based on busyness data
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ textAlign: "center", marginTop: "0px" }}
        >
          <img
            src={image}
            alt="Overview"
            style={{
              width: "100%",
              maxWidth: "550px",
              justifyContent: "start",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "40px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "orangered",
              color: "white",
              padding: "10px 20px",
              fontSize: "18px",
              "&:hover": { backgroundColor: "darkorange" },
            }}
            href="/login"
          >
            Start Today - It's Free!
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
