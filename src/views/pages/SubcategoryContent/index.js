import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItemsById } from '../../../store/app';
import { CircularProgress, Grid, List, Pagination, Typography } from '@mui/material';
import ProductItem from '../../components/ProductItem';
import { useTranslation } from 'react-i18next';
import { setReviewedSubcategories } from '../../../store/app/actions';
import { useSearchParams } from 'react-router-dom';

const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: 145,
    width: '100%',
  },
  typography: {
    mt: 2,
  },
};

const SubcategoryContent = () => {
  const dispatch = useDispatch();
  const { productsById, isLoadingItemsById, selectedItem, reviewedSubcategories } = useSelector(
    ({ appReducer }) => appReducer
  );
  const { _id } = useParams();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  useEffect(() => {
    dispatch(getItemsById({ collection: 'subcategories', _id, type: 'products', page }));
    window.scrollTo(0, 0);
    if (!reviewedSubcategories.includes(_id)) {
      dispatch(setReviewedSubcategories(_id));
    }
  }, [_id, page]);

  const { products, totalPages, currentPage } = productsById;
  const getData = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    dispatch(
      getItemsById({
        collection: 'subcategories',
        _id: selectedItem.subcategoryId,
        type: 'products',
        page
      })
    );
    window.scrollTo(0, 0);
  };

  return (
    <Grid sx={styles.gridContainer}>
      {isLoadingItemsById ? (
        <CircularProgress color="inherit" />
      ) : !products?.length ? (
        <Typography variant="h5" sx={styles.typography}>
          {t('no_results')}
        </Typography>
      ) : (
        <List>
          {products?.map((item, i) => (
            <ProductItem key={i} {...item} />
          ))}
          {totalPages > 1 && (
            <Pagination
              size="large"
              count={totalPages}
              page={currentPage || 1}
              onChange={(e, page) => getData(page)}
              showFirstButton
              showLastButton
            />
          )}
        </List>
      )}
    </Grid>
  );
};

export default SubcategoryContent;
