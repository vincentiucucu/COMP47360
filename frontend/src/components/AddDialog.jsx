// AddDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';

const AddDialog = ({ open, handleClose, handleAdd, type }) => {
  const initialFormState = type === 'business'
    ? { business: '', unit_name: '', permit_id: '', permit_expiry_date: '', unit_type: '' }
    : { business: '', vendor_name: '', licence_id: '', licence_expiry_date: '', vendor_email: '', vendor_phone_number: '' };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    handleAdd(formState);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Add New ${type === 'business' ? 'Business Unit' : 'Vendor'}`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(initialFormState).map((key) => (
            <Grid item xs={12} key={key}>
              <TextField
                fullWidth
                label={key.replace('_', ' ')}
                name={key}
                value={formState[key]}
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
