import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, value, onChange, ...props }) => (
  <TextField
    {...props}
    id="outlined-basic"
    InputLabelProps={{ shrink: true }}
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
    sx={{ mb: 2, width: '100%' }}
    autoFocus
  />
);

export default Input;
