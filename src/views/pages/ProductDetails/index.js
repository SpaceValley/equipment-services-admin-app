import React, { useEffect, useLayoutEffect } from 'react';
import { CircularProgress, Grid, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductItem from '../../components/ProductItem';
import ContactForm from '../../components/ContactForm';
import { getProduct } from '../../../store/app/actions';

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'sticky',
    top: 145
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
};


const ProductDetails = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, selectedItem } = useSelector(({ appReducer }) => appReducer);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem?.product?._id) {
      dispatch(getProduct(_id));
    }
  }, []);

  if (isLoading) {
    return (
      <Grid sx={styles.loadingContainer}>
        <CircularProgress color="inherit" />
      </Grid>
    );
  }

  return (
    <Grid sx={styles.contentContainer}>
      <ProductItem {...selectedItem?.product} />
      <Container>
        <ContactForm isProduct />
      </Container>
    </Grid>
  );
};

export default ProductDetails;
