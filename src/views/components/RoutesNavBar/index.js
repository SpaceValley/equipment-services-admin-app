import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setOpenedCategories, setSelectedItem, toggleDrawer } from '../../../store/app/actions';
import { List, ListItem, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './index.sass';

const RoutesNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedItem } = useSelector(({ appReducer }) => appReducer);
  const { i18n } = useTranslation();
  const isSmallerDevicesScreen = useMediaQuery('(max-width:768px)');

  const onCategoryClick = () => {
    navigate('/');
    window.scrollTo(0, 0);

    dispatch(setOpenedCategories([selectedItem?.categoryId]));
    if (selectedItem !== null) dispatch(setSelectedItem(null));
    if (isSmallerDevicesScreen) dispatch(toggleDrawer());
  };

  const isSubcategoryButtonActive = Boolean(selectedItem?.product);
  const onSubCategoryClick = () => {
    if (!isSubcategoryButtonActive) return;
    navigate(`subcategories/${selectedItem?.subcategoryId}`);
  };

  if (!selectedItem) return null;

  return (
    <div className="routesNavBar">
      <List disablePadding sx={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem
          button
          sx={{
            width: 'auto',
            '&:hover': { backgroundColor: 'white', textDecoration: 'underline' }
          }}
          onClick={onCategoryClick}
        >
          <Typography
            sx={{ width: 'max-content', typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
          >
            {selectedItem?.categoryName?.[i18n.language]}
          </Typography>
        </ListItem>
        {selectedItem?.subcategoryName && (
          <ListItem
            button={isSubcategoryButtonActive}
            sx={{
              width: 'auto',
              '&:hover': {
                backgroundColor: 'white',
                textDecoration: isSubcategoryButtonActive ? 'underline' : 'none'
              }
            }}
            onClick={onSubCategoryClick}
          >
            <KeyboardArrowRightIcon sx={{ ml: -2, mr: 2 }} />
            <Typography
              sx={{ width: 'max-content', typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
            >
              {selectedItem?.subcategoryName?.[i18n.language]}
            </Typography>
          </ListItem>
        )}
        {selectedItem?.product?.name && (
          <ListItem sx={{ width: 'auto' }}>
            <KeyboardArrowRightIcon sx={{ ml: -2, mr: 2 }} />
            <Typography
              sx={{ width: 'max-content', typography: { xs: 'subtitle2', lg: 'subtitle1' } }}
            >
              {selectedItem?.product?.name?.[i18n.language]}
            </Typography>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default RoutesNavBar;
