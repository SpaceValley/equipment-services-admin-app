import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEditItem from '../../components/AddEditItem';
import List from '../../components/List';
import { getItemsById } from '../../../store/app';
import { useLocation } from 'react-router-dom';

const AddEditCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { subcategoriesById } = useSelector(({ appReducer }) => appReducer);
  const { isEditing, _id } = location?.state;

  useEffect(() => {
    if (isEditing) {
      dispatch(getItemsById({ collection: 'categories', _id, type: 'subcategories' }));
    }
  }, [isEditing]);

  return (
    <>
      <AddEditItem />
      {isEditing && <List type="subcategories" data={subcategoriesById} />}
    </>
  );
};

export default AddEditCategory;
