import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Footer from '../Footer';
import CategoryItem from '../CategoryItem';

const SideBar = () => {
  const { categories } = useSelector(({ appReducer }) => appReducer);
  return (
    <Grid
      id="sidebar"
      sx={{
        mt: -1,
        mr: {
          xs: 2,
          lg: 4
        }
      }}
    >
      <div>
        {categories?.map((item, i) => (
          <CategoryItem key={i} {...item} />
        ))}
      </div>
      <Footer />
    </Grid>
  );
};

export default SideBar;
