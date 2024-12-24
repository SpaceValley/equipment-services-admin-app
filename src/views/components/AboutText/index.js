import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutText = () => {
  const { t } = useTranslation();
  return (
    <Grid sx={{ mt: 1 }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 'bold',
          typography: { xs: 'h6', lg: 'h5' }
        }}
      >
        {t('about_title')}
      </Typography>
      <Typography
        sx={{
          whiteSpace: 'break-spaces',
          textAlign: 'center',
          typography: { xs: 'subtitle1', lg: 'h6' }
        }}
      >
        {t('about_subtitle')}
      </Typography>
      <Typography
        sx={{
          whiteSpace: 'break-spaces',
          textAlign: 'center',
          typography: { xs: 'subtitle1', lg: 'h6' }
        }}
      >
        {t('about_description')}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 'bold',
          typography: { xs: 'h6', lg: 'h5' }
        }}
      >
        {t('about_footer')}
      </Typography>
    </Grid>
  );
};

export default AboutText;
