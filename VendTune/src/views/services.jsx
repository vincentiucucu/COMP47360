import { Box, Typography, Grid } from "@mui/material";
import "../assets/styles/SignIn.scss";
import AppBar from "../components/AppBarLayout";
import Map from "../components/MapBox";
import TableView from "../components/TableView";
import ButtonBox from "../components/ButtonBox";

function Services() {
  return (
    <Box>
      {/* App Bar */}
      <AppBar></AppBar>

      {/* Layout */}
      <Box sx={{ flexGrow: 1, paddingTop: "60px", paddingLeft:'20px' }}>

        {/* Header */}
        <Box className="headertitle">
          <Typography
            sx={{ color: "black", fontSize: "35px", fontWeight: "500" }}
          >
            Services
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ height: "100%" , paddingBottom: '30px'}}>

          {/* Planned Services */}
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box
              sx={{
                // bgcolor: "red",
                display: "flex",
                flexDirection:'column',
                justifyContent: "start",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: 'auto 1fr',
                  alignSelf: 'start',
                }}
              >
                <Typography sx={{color:'black', pr:'10px', fontSize: "25px",  alignContent:'center'}}>
                  Planned Services
                </Typography>
                <ButtonBox></ButtonBox>
              </Box>
              <Box>
                <TableView></TableView>
              </Box>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} >
            <Map></Map>
          </Grid>

          {/* Past Services */}
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box
              sx={{
                // bgcolor: "red",
                display: "flex",
                flexDirection:'column',
                justifyContent: "start",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: 'auto 1fr',
                  alignSelf: 'start',
                }}
              >
                <Typography sx={{color:'black', pr:'10px', fontSize: "25px",  alignContent:'center'}}>
                  Past Services
                </Typography>
                <ButtonBox></ButtonBox>
              </Box>
              <Box>
                <TableView></TableView>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Services;
