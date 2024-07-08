import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" component="h1" sx={{ color: 'red' }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: 'red' }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link to="/">
        <Typography variant="body1" component="span" sx={{ color: 'primary.main' }}>
          Go to Home
        </Typography>
      </Link>
    </Box>
  );
};

export default NotFound;