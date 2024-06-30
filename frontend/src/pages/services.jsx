import { Button, Box, Typography, Grid } from "@mui/material";
import "../assets/styles/SignIn.scss";
import AppBar from "../components/AppBarLayout";
import Map from "../components/MapBox";
import DataGrid from "../components/DataGrid";
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";

function Services() {
  const buttonStyles = {
    textTransform: "none",
    backgroundColor: "#F6F6F6",
    borderRadius: "10px",
    padding: "1px 5px",
    marginRight: "8px",
    color: "black",
    borderColor: "transparent",
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/planning');
  };

  return (
    <Box>
      {/* App Bar */}
      <AppBar></AppBar>

      {/* Layout */}
      <Box sx={{ flexGrow: 1, paddingTop: "60px", paddingLeft: "20px" }}>
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
                  p:'10px 0px',
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
              <Box>
                <DataGrid></DataGrid>
              </Box>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Map></Map>
          </Grid>

          {/* Past Services */}
          <Grid
            sx={{ marginTop: { xs: "100px",sm: "100px", md: "100px", lg:'0px' } }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
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
                  p:'10px 0px',
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
              <Box>
                <DataGrid></DataGrid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Services;
