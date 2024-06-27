import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import {
    DateRange,
    AccessTime,
    Business,
    People,
    Place,
  } from "@mui/icons-material";
  
export default function PlanningCard() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "75px",
        left: "20px",
        height: "80vh",
        width: "20vw",
        minWidth: "250px",
        minHeight: "530px",
        bgcolor: "white",
        borderRadius: "20px",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "orangered" }}>
        Plan A Service
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Autofill with Previous Service Details"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRange />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Start Time"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="End Time"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Business Unit"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Business />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Authorised Vendors"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <People />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Areas"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Place />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
