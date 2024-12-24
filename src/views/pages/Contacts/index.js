import React, { useLayoutEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import ContactForm from '../../components/ContactForm';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer';

const Contacts = () => {
  const { t } = useTranslation();
  useLayoutEffect(() => window.scrollTo(0, 0), []);

  return (
    <Grid>
      <Typography variant="h4" sx={{ textAlign: 'center', mt: 1, mb: 5 }}>
        {t('contacts_title')}
      </Typography>
      <Footer />
      <ContactForm />
    </Grid>
  );
};

export default Contacts;
