import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../../store/app';
import List from '../../components/List';

const Products = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(({ appReducer }) => appReducer);

  const getData = (page) => dispatch(getItems({ type: 'products', page: page || products.currentPage }));

  useEffect(() => {
    getData();
  }, []);

  return (
    <List
      type="products"
      hideAddButton
      data={products.products}
      currentPage={products.currentPage}
      totalPages={products.totalPages}
      getData={getData}
    />
  );
};

export default Products;
