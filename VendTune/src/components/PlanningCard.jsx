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

import Calender from "./Calender";
import TimePicker from "./Time";

export default function PlanningCard() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "75px",
        left: "20px",
        height: "auto",
        width: "20vw",
        minWidth: "250px",
        bgcolor: "white",
        borderRadius: "20px",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "orangered" }}>
        Plan A Service
      </Typography>

      <Calender sx={{mb: 5}}/>

      <TimePicker name='Start Time'/>

      <TimePicker name='End Time'/>

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
