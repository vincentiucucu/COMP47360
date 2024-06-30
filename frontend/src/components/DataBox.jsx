import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const DataBox = () => {

  const textStyle = {
    flex: 1, fontWeight: 'bold', color: '#e57373', margin: '10px'
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FEE9C4',
      padding: 2,
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', backgroundColor: '#fff', borderRadius: '10px 10px 0 0' }}>
        <Typography sx={ textStyle }>Location</Typography>
        <Typography sx={textStyle}>Vendor</Typography>
        <Typography sx={ textStyle }>Unit</Typography>
        <Typography sx={ textStyle }>Date</Typography>
        <Typography sx={ textStyle }>Time</Typography>
        <Typography sx={ textStyle }>EFT</Typography>
      </Box>
      {/* <IconButton aria-label="close" size="small">
            <CloseIcon />
      </IconButton> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center',color:'#718096'}}>
        <Box sx={{ flex: 1}}>
          <Typography><strong>W. Durham Street New York, NY 10027</strong></Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{fontSize:'14px'}}><strong>John Burrito</strong></Typography>
          <Typography sx={{fontSize:'14px'}}>john@burrito.com</Typography>
          <Typography sx={{fontSize:'14px'}}>Vendor Id: <strong>C4049</strong></Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>Fatys Burgers</Typography>
          <Typography>Id: <strong>AA08267</strong></Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>Tue, 11/06/2024</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>11:00 - 15:00</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>4567</Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <IconButton aria-label="edit" size="small">
            <EditIcon />
            <Typography sx={{ marginLeft: 1 }}>EDIT</Typography>
          </IconButton>
        </Box> */}
      </Box>
    </Box>
  );
};

export default DataBox;
