import React from 'react';
import { Typography, Grid, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedCategories, setSelectedItem, toggleDrawer } from '../../../store/app/actions';
import { useTranslation } from 'react-i18next';
import ENFlag from '../../../assets/en.svg';
import UAFlag from '../../../assets/ua.svg';
import LogoEN from '../../../assets/logo-en.png';
import LogoUA from '../../../assets/logo-ua.png';
import SideBar from '../SideBar';
import RoutesNavBar from '../RoutesNavBar';
import './index.sass';

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { categories, isDrawerOpened, openedCategories, selectedItem } = useSelector(({ appReducer }) => appReducer);

  const openCategories = () => {
    if (selectedItem !== null) dispatch(setSelectedItem(null));
    const opened = categories.reduce((acc, e) => e._id && acc.concat(e._id), []);
    dispatch(setOpenedCategories(opened));
    window.scrollTo(0, 0);
  };

  const clearState = () => {
    if (selectedItem !== null) dispatch(setSelectedItem(null));
    if (openedCategories.length) dispatch(setOpenedCategories([]));
    window.scrollTo(0, 0);
    if (isDrawerOpened) setDrawerOpened(false);
  };

  const drawerToggle = () => dispatch(toggleDrawer());

  const HeaderMenu = () => (
    <div className={clsx(isDrawerOpened ? 'drawerMenuItemsWrap' : 'menuItemsWrap')}>
      <Link to="/" onClick={openCategories}>
        <Typography
          sx={{ mx: 2, my: { xs: 2, md: 0 }, typography: { lg: 'h6' } }}
          color="black"
          onClick={openCategories}
        >
          {t('equipment')}
        </Typography>
      </Link>
      <Link to="/about" onClick={clearState}>
        <Typography sx={{ mx: 2, my: { xs: 2, md: 0 }, typography: { lg: 'h6' } }} color="black">
          {t('about')}
        </Typography>
      </Link>
      <Link to="/contacts" onClick={clearState}>
        <Typography sx={{ mx: 2, my: { xs: 2, md: 0 }, typography: { lg: 'h6' } }} color="black">
          {t('contacts')}
        </Typography>
      </Link>
      {!isDrawerOpened && (
        <div className="flagsWrap">
          <img src={UAFlag} alt="lang" onClick={() => changeLanguage('ua')} className="flag" />
          <img src={ENFlag} alt="lang" onClick={() => changeLanguage('en')} className="flag" />
        </div>
      )}
    </div>
  );

  return (
    <Grid
      sx={{
        zIndex: theme.zIndex.drawer
      }}
      className="header-container"
    >
      <div className="header">
        <MenuIcon id="menuIcon" onClick={drawerToggle} />
        <div className="header-content">
          <Link to="/" onClick={clearState} id="logoWrap">
            <img src={i18n.language === 'ua' ? LogoUA : LogoEN} alt="logo" className="logo" />
          </Link>
          {!isDrawerOpened && <HeaderMenu />}
        </div>
      </div>
      <RoutesNavBar />
      <Drawer anchor="left" open={isDrawerOpened} onClose={drawerToggle}>
        <div className="drawerContent">
          <div className="closeIconFlagsWrap">
            <CloseIcon id="closeIcon" onClick={drawerToggle} />
            <div className="flagsWrap">
              <img src={UAFlag} alt="lang" onClick={() => changeLanguage('ua')} className="flag" />
              <img src={ENFlag} alt="lang" onClick={() => changeLanguage('en')} className="flag" />
            </div>
          </div>
          <HeaderMenu />
          <SideBar />
        </div>
      </Drawer>
    </Grid>
  );
};

export default Header;
