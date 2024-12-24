import React from 'react';
import {Button as ButtonComponent} from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

const Button = ({ startIcon, onClick, label, variant }) => {
  const { isProcessing } = useSelector(({ appReducer }) => appReducer);
  const theme = useTheme();

  return (
    <ButtonComponent
      disabled={isProcessing}
      variant={variant || 'contained'}
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        backgroundColor: !variant && theme.palette.background.darkBlue,
        '&:hover': {
          backgroundColor: !variant && theme.palette.background.darkBlue
        },
        ...(!variant && {width: theme.spacing(18)}),
        mt: 4
      }}
    >
      {label}
    </ButtonComponent>
  );
};

export default Button;
