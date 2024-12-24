import React, { useMemo } from 'react';
import { CircularProgress, Container, Typography, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Link, useLocation } from 'react-router-dom';
import PlusIcon from '@mui/icons-material/Add';
import Button from '../Button';

const List = ({ type, data, hideAddButton, getData, totalPages, currentPage }) => {
  const location = useLocation();

  const { isLoading, isLoadingItemsById } = useSelector(({ appReducer }) => appReducer);

  const getTitle = () => {
    switch (type) {
      case 'categories':
        return 'Категорії';
      case 'subcategories':
        return 'Підкатегорії';
      case 'products':
        return 'Одиниці товару';
    }
  };

  const title = useMemo(() => getTitle(), [type]);

  const renderListItem = (item) => {
    const editItemParams = {
      isEditing: true,
      type,
      _id: item?._id,
      item,
      categoryName: location?.state?.item.name.ua,
      subcategoryName: location?.state?.item.name.ua
    };

    return (
      <Link key={item?._id} to={`/admin/${type}/edit`} state={editItemParams}>
        <Typography variant="h5" sx={{ my: 3, color: 'black' }}>
          {item?.name?.ua}
        </Typography>
      </Link>
    );
  };

  const addItemParams = {
    isEditing: false,
    type,
    _id: location?.state?._id,
    item: location?.state?.item,
    categoryName: location?.state?.item.name.ua,
    subcategoryName: location?.state?.item.name.ua
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container direction="row" alignItems="center">
        <Typography variant="h4">{title}</Typography>
        {(isLoading || isLoadingItemsById) && <CircularProgress color="inherit" sx={{ ml: 4 }} />}
      </Grid>
      <Grid sx={{ ml: 4 }}>
        {(!isLoading || !isLoadingItemsById) &&
          (!data?.length ? (
            <Typography variant="subtitle1" sx={{ mt: 3, mb: totalPages > 1 ? 3 : 0 }}>
              Немає результатів
            </Typography>
          ) : (
            data?.map((e) => renderListItem(e))
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
        {!hideAddButton && (
          <Link to={`/admin/${type}/add`} state={addItemParams}>
            <Button startIcon={<PlusIcon />} label="Створити" />
          </Link>
        )}
      </Grid>
    </Container>
  );
};

export default List;
