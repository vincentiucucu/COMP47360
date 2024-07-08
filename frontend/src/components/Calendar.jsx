import * as React from "react";
import dayjs from 'dayjs';
import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <Box sx={{ mb: 2, position: "relative" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker className="DatePicker" 
          label="Date" 
          value={value}
          onChange={(newValue) => setValue(newValue)}/>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
