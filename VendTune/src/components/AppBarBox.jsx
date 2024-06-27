import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import logo from "../assets/Images/Logo/VendTune_Logo.png";
import profile from "../assets/Images/Logo/Profile.png";
import SideDrawer from './SideDrawer'

export default function AppBarBox({ toggleDrawer }) {
  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ 
          display: 'grid',
          gridTemplateColumns: '0.3fr 8.3fr 1.4fr',
          height: '3vw',
          bgcolor: "#2E2E2E",
        }}>
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
          <Box sx={{  }}>
            <img src={logo} alt="Logo" style={{height: '70px'}} />
          </Box>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '8fr 2fr',
          }}>
             <Typography sx={{color:'#EE6C4D', alignSelf:'center', textAlign:'end'}}>
              Foodie Finder
            </Typography>
            <IconButton>
            <img src={profile} alt="Logo" style={{height: '45px'}} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer></SideDrawer>
    </Box>
  );
}
