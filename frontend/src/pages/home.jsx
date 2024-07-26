import React, { useState } from "react";
import { Box, Button, Grid, Typography, Link } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import logo from "../assets/Images/Logo/VendTune_Logo.png";
import dashboard from "../assets/Images/StockImages/DashboardImg.png";
import business from "../assets/Images/StockImages/BusinessImg.png";
import services from "../assets/Images/StockImages/ServicesImg.png";

const buttonHoverEffect = keyframes`
  0% { box-shadow: 0 0 0px #ff4500; }
  100% { box-shadow: 0 0 20px #ff4500; }
`;

const buttonStyle = {
  textAlign: "center",
  textAlign: "start",
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

const SignInLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 20px;
  position: relative;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: orangered;
    transform: translateX(5px);
    &::after {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &::after {
    content: "→";
    position: absolute;
    right: -15px;
    top: 0;
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.3s, transform 0.3s;
  }
`;

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
        backgroundColor: "#333333",
        position: "absolute",
        top: "0px",
        left: "0px",
        p: "20px",
        // height: {xs:'100vh', md:'100%'}
      }}
    >
      <Box
        sx={{
          backgroundColor: "#333333",
          color: "white",
          height: { xs: "100vh", md: "100%" },
          width: "100%",
          mb: "4px",
        }}
      >
        <Grid container spacing={2} sx={{}}>
          <Grid item xs={6} sx={{ textAlign: "start" }}>
            <Box sx={{ display: "flex", textAlign: "center" }}>
              <img src={logo} alt="Logo" style={{ height: "30px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <SignInLink href="/login">Sign in</SignInLink>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                mt: {
                  xs: "30px",
                  md: "-40px",
                },
                fontWeight: "bold",
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
              }}
            >
              Mobile Food Vending Made Easy
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#9A9999",
                marginTop: "10px",
                marginBottom: "20px",
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                  md: "1.5rem",
                },
              }}
            >
              A Data-Driven Approach to Managing Your Mobile Food Vending
              Business
            </Typography>
          </Grid>
          <Grid sx={{alignContent:'center'}} item xs={12} md={4}>
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
                  color: "#9A9999",
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
                  color: "#9A9999",
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
                  color: "#9A9999",
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
                maxWidth: "784px",
                justifyContent: "start",
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "0px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "orangered",
                color: "white",
                padding: "10px 20px",
                fontSize: "18px",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "darkorange" },
              }}
              href="/login"
            >
              Start Today - It's Free!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
