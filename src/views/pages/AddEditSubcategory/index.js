import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEditItem from '../../components/AddEditItem';
import List from '../../components/List';
import { getItemsById } from '../../../store/app';
import { useLocation } from 'react-router-dom';

const AddEditSubcategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { productsById } = useSelector(({ appReducer }) => appReducer);
  const { isEditing, _id } = location?.state;
  
  const getData = (page) => {
    dispatch(getItemsById({ collection: 'subcategories', _id, type: 'products', page: page || productsById.currentPage }));
  };

  useEffect(() => {
    if (isEditing) {
      getData();
    }
  }, [isEditing]);

  return (
    <>
      <AddEditItem />
      {isEditing && (
        <List
          type="products"
          data={productsById.products}
          currentPage={productsById.currentPage}
          totalPages={productsById.totalPages}
          getData={getData}
        />
      )}
    </>
  );
};

export default AddEditSubcategory;
