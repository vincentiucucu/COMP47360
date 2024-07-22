import React from "react";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../styles/Common.scss";

const Time = (props) => {
  const [selectedTime, setSelectedTime] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 2, position: "relative" }}>
        <TimePicker
          label={props.name}
          value={selectedTime}
          onChange={setSelectedTime}
          className="DatePicker"
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mb: 2 }} />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Time;
