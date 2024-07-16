import * as React from "react";
import dayjs from 'dayjs';
import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import 'dayjs/locale/en';  
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

export default function BasicDatePicker({ onDateChange }) {
  const [value, setValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const formattedDate = newValue.format("ddd, DD/MM/YYYY");
    onDateChange(formattedDate);
  };

  return (
    <Box sx={{ mb: 2, position: "relative" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            className="DatePicker"
            label="Date"
            value={value}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
