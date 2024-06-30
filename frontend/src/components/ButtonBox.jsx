import React from "react";
import { Box, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

const ButtonBox = () => {
  const buttonStyles = {
    textTransform: "none",
    backgroundColor: "#F6F6F6",
    borderRadius: "10px",
    padding: "1px 5px",
    marginRight: "8px",
    color:'black',
    borderColor: 'transparent',
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        padding: 2,
        borderRadius: "10px",
        margin: "0 auto",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<SortIcon />}
        sx={buttonStyles}
      >
        Sort
      </Button>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        sx={buttonStyles}
      >
        Filter
      </Button>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={buttonStyles}
      >
        Add
      </Button>
    </Box>
  );
};

export default ButtonBox;
