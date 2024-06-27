import React from "react";
import {
  Grid,
  Box,
} from "@mui/material";
import Map from "../components/MapBox";
import AppBar from "../components/AppBarLayout";
import PlanningCard from "../components/PlanningCard";

export default function planning() {
  return (
    <Box>
      {/* App Bar */}
      <AppBar></AppBar>
      <Grid sx={{ width: "100%", height: "85vh" }}>
        <Map></Map>
      </Grid>
      <PlanningCard></PlanningCard>
    </Box>
  );
}
