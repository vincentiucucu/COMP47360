import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material"

function Main() {

    const navigate = useNavigate(); 
  
    const handleLoginClick = () => {
      navigate('/login'); 
    };
  
    const handleSignInClick = () => {
      navigate('/signin'); 
    };

  return (
    <Box>

    </Box>
  );
}

// Exporting the component for use in other parts of the application
export default Main;
