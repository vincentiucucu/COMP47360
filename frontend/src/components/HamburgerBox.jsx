import React, { useState } from 'react';
import Box from "@mui/material/Box";
import AppBarBox from './AppBarGrid'
import SideDrawer from './SideDrawer'

export default function HamburgerBox() {
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
    console.log(open);
  };

  return (
    <Box>
      <AppBarBox toggleDrawer={toggleDrawer} />
      <SideDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
