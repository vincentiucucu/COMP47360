import { Button } from "@mui/material";

const CustomToast = ({ closeToast }) => (
    <div>
      <h3>Error</h3>
      <p>Something went wrong. Please try again.</p>
      <Button onClick={closeToast} style={{ color: '#ff7043' }}>Close</Button>
    </div>
  );
export default CustomToast;