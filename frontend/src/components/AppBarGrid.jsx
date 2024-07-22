import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import logo from "../assets/Images/Logo/VendTune_Logo.png";
import profile from "../assets/Images/Logo/Profile.png";
import SideDrawer from "./SideDrawer";
import { useMediaQuery, useTheme } from "@mui/material";

export default function AppBarGrid({ toggleDrawer }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: "0.1fr 9.9fr auto",
            height: { xs: "65px", sm: "65px", md: "40px", lg: "40px" },
            bgcolor: "#2E2E2E",
            position:"static"
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Box sx={{ display: "flex", textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "8fr 2fr",
              justifyContent: 'end',
            }}
          >
            {!isSmallScreen && (
              <Typography
                sx={{ color: "#EE6C4D", alignSelf: "center", textAlign: "end" }}
              >
                Foodie Finder
              </Typography>
            )}
            <IconButton>
              <img src={profile} alt="Logo" style={{ height: "45px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer></SideDrawer>
    </Box>
  );
}
