import React from 'react';
import { Grid, ListItem, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PlaceIcon from '@mui/icons-material/Place';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Grid sx={{ mt: 1, pt: 2 }}>
      <List>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}
        >
          <Typography
            sx={{ color: 'black', mb: 1, typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
          >
            {t('address_label')}
          </Typography>
          <a href="https://goo.gl/maps/eLS2zSZBB4KfFRL7A" target="_blank">
            <Grid sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
              <PlaceIcon sx={{ mr: 1 }} />
              <Typography
                sx={{
                  color: 'black',
                  whiteSpace: 'break-spaces',
                  typography: { xs: 'subtitle2', lg: 'subtitle1' }
                }}
              >
                {t('address')}
              </Typography>
            </Grid>
          </a>
        </ListItem>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}
        >
          <Typography
            sx={{ color: 'black', mb: 1, typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
          >
            Email:
          </Typography>
          <a href="mailto:example@mail.com">
            <Grid sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
              <MailOutlineRoundedIcon sx={{ mr: 1 }} />
              <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
                example@mail.com
              </Typography>
            </Grid>
          </a>
        </ListItem>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            sx={{ color: 'black', mb: 1, typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
          >
            {t('phone_numbers')}
          </Typography>
          <a href="tel:+380965757302">
            <Grid sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
              <PhoneAndroidIcon sx={{ mr: 1 }} />
              <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
                +380997777777
              </Typography>
            </Grid>
          </a>
          <a href="tel:+380505162110">
            <Grid sx={{ display: 'flex', alignItems: 'center', color: 'black', mt: 1 }}>
              <PhoneAndroidIcon sx={{ mr: 1 }} />
              <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
                +380737777777
              </Typography>
            </Grid>
          </a>
        </ListItem>
      </List>
    </Grid>
  );
};

export default Footer;
