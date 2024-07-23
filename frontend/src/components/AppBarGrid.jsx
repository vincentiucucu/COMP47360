import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import logo from "../assets/Images/Logo/VendTune_Logo.png";
import profile from "../assets/Images/Icons/profile.png";
import SideDrawer from "./SideDrawer";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

export default function AppBarGrid({ toggleDrawer, logout }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSignOutButton, setShowSignOutButton] = React.useState(false);

  const handleToggleSignOutButton = () => {
    setShowSignOutButton(!showSignOutButton);
  };

  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: "0.1fr 9.9fr auto",
            height: { xs: "65px", sm: "65px", md: "40px", lg: "40px" },
            bgcolor: "#2E2E2E",
            position: "static",
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
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "8fr 2fr",
              justifyContent: "end",
            }}
          >
            {!isSmallScreen && (
              <Typography
                sx={{ color: "#EE6C4D", alignSelf: "center", textAlign: "end" }}
              >
                Profile
              </Typography>
            )}
            <IconButton onClick={handleToggleSignOutButton}>
              <img src={profile} alt="Profile" style={{ height: "45px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {showSignOutButton && (
        <Box
          sx={{
            position: "absolute",
            top: 65,
            right: 16,
            zIndex:'100'
          }}
        >
          <Button sx={{ bgcolor: "#f6f6f6", color: 'black'}} onClick={logout}>
            Sign Out
          </Button>
        </Box>
      )}
      <SideDrawer />
    </Box>
  );
}
