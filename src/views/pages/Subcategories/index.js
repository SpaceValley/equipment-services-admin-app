import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../../store/app';
import List from '../../components/List';

const Subcategories = () => {
  const dispatch = useDispatch();

  const { subcategories } = useSelector(({ appReducer }) => appReducer);

  useEffect(() => {
    dispatch(getItems({ type: 'subcategories' }));
  }, []);

  return <List type="subcategories" hideAddButton data={subcategories} />;
};

export default Subcategories;
