import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import BasicDatePicker from './Calendar';
import dayjs from 'dayjs';

const AddDialog = ({ open, handleClose, handleAdd, type }) => {
  const initialFormState = type === 'business'
    ? { unit_name: '', permit_id: '', permit_expiry_date: '', unit_type: '' }
    : { vendor_name: '', licence_id: '', licence_expiry_date: '', vendor_email: '', vendor_phone_number: '' };

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      setFormState(initialFormState);
    }
  }, [open, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDateChange = (name, newValue) => {
    setFormState({
      ...formState,
      [name]: newValue ? dayjs(newValue).format('YYYY-MM-DD') : ''
    });
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
              {key.includes('expiry_date') ? (
                <BasicDatePicker
                  label={key.replace('_', ' ')}
                  value={formState[key] ? dayjs(formState[key], 'YYYY-MM-DD') : null}
                  onDateChange={(date) => handleDateChange(key, date)}
                />
              ) : (
                <TextField
                  fullWidth
                  label={key.replace('_', ' ')}
                  name={key}
                  value={formState[key] || ''} 
                  onChange={handleChange}
                  required
                />
              )}
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
