import React, { useEffect, useRef } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  getCategoriesWithSubcategories,
  setOpenedCategories,
  setSelectedItem,
  toggleDrawer
} from '../../../store/app/actions';
import ProductDetails from '../ProductDetails';
import About from '../About';
import Contacts from '../Contacts';
import { useTranslation } from 'react-i18next';
import AboutText from '../../components/AboutText';
import SubcategoryContent from '../SubcategoryContent';
import SideBar from '../../components/SideBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import './index.sass';

const Home = () => {
  const dispatch = useDispatch();

  const { selectedItem, openedCategories } = useSelector(({ appReducer }) => appReducer);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(getCategoriesWithSubcategories());
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (location.pathname === '/') {
      if (selectedItem !== null)  dispatch(setSelectedItem(null));
    }
  }, [location]);

  const HomeContent = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { categories } = useSelector(({ appReducer }) => appReducer);

    const isSmallerDevicesScreen = useMediaQuery('(max-width:768px)');

    const onClick = () => {
      if (isSmallerDevicesScreen) {
        dispatch(toggleDrawer());
      }
      const opened = categories.reduce((acc, e) => e._id && acc.concat(e._id), []);
      dispatch(setOpenedCategories(opened));
    };

    if (!selectedItem && openedCategories.length) {
      return (
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', position: 'sticky', top: 145, cursor: 'pointer' }}
          onClick={onClick}
        >
          {t('select_equipment')}
        </Typography>
      );
    }

    if (!selectedItem) {
      return <AboutText />;
    }
  };

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container sx={{ mt: { xs: 2, sm: 5 }, mb: 5, flex: 1 }} id="container">
        <Grid container sx={{ flexDirection: 'row', flexWrap: 'noWrap' }}>
          <div className="sidebarWrap">
            <SideBar />
          </div>
          <Grid sx={{ width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/subcategories/:_id" element={<SubcategoryContent />} />
              <Route path="/subcategories/:_id/products/:_id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;
