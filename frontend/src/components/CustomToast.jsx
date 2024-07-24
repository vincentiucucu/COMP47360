import React from "react";
import { Button } from "@mui/material";

const CustomToast = ({ closeToast, text }) => (
  <div>
    <h3>Error</h3>
    <p>{text || "Something went wrong. Please try again."}</p>
    <Button onClick={closeToast} style={{ color: '#ff7043' }}>Close</Button>
  </div>
);

export default CustomToast;
