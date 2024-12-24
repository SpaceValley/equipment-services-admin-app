import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  setOpenedCategories,
  setReviewedSubcategories,
  toggleDrawer
} from '../../../store/app/actions';
import { Collapse, List, ListItem, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CategoryItem = ({ _id, name, subcategories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { selectedItem, openedCategories, reviewedSubcategories, isDrawerOpened } = useSelector(
    ({ appReducer }) => appReducer
  );

  const isCategoryOpened = openedCategories?.includes(_id);

  const onCategoryClick = () => {
    const updated = isCategoryOpened
      ? openedCategories?.filter((e) => e !== _id)
      : [...openedCategories, _id];
    dispatch(setOpenedCategories(updated));
  };

  const onSubcategoryClick = (e) => {
    navigate(`subcategories/${e._id}`);
    dispatch(setReviewedSubcategories(e._id));
    if (isDrawerOpened) dispatch(toggleDrawer());
  };

  return (
    <List>
      <ListItem button onClick={onCategoryClick}>
        <Typography sx={{ fontWeight: 'bold', width: '100%', typography: { lg: 'h6' } }}>
          {name?.[i18n.language]}
        </Typography>
        {subcategories?.length ? isCategoryOpened ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {subcategories?.length ? (
        <Collapse in={isCategoryOpened} timeout="auto" unmountOnExit>
          <List>
            {subcategories?.map((e, i) => {
              const selected = selectedItem?.subcategoryName?.ua === e?.name?.ua;
              return (
                <ListItem button key={i} onClick={() => onSubcategoryClick(e)}>
                  <Typography
                    sx={{
                      ml: 2,
                      color: selected
                        ? 'red'
                        : reviewedSubcategories.includes(e._id)
                        ? '#4c008d'
                        : '#002f8d',
                      typography: { sm: 'subtitle2', lg: 'subtitle1' }
                    }}
                  >
                    {e?.name?.[i18n.language]}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      ) : null}
    </List>
  );
};

export default CategoryItem;
