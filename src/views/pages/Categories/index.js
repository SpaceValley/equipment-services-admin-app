import React, { useEffect } from 'react';
import { getItems } from '../../../store/app';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List';

const Categories = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector(({ appReducer }) => appReducer);

  useEffect(() => {
    dispatch(getItems({ type: 'categories' }));
  }, []);

  return <List type="categories" data={categories} />;
};

export default Categories;
