import axios from 'axios';

const PRODUCTION = true;

const BASE_URL = PRODUCTION
  ? 'https://396011.lm.r.appspot.com/api/v1'
  : 'http://localhost:8000/api/v1';

export const getItems = (data) => axios.get(`${BASE_URL}/${data.type}?page=${data?.page}`);

export const getItemsById = (data) =>
  axios.get(`${BASE_URL}/${data.collection}/${data._id}/${data.type}?page=${data?.page}`);

export const getProduct = (_id) => axios.get(`${BASE_URL}/products/${_id}`);

export const createItem = (payload) => {
  const { type, data } = payload;
  return axios.post(`${BASE_URL}/${type}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const editItem = (payload) => {
  const { type, _id, data } = payload;
  return axios.post(`${BASE_URL}/${type}/${_id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteItem = (data) => axios.delete(`${BASE_URL}/${data.type}/${data._id}`);

export const getCategoriesWithSubcategories = () =>
  axios.get(`${BASE_URL}/categories/subcategories`);

export const sendContactRequestOnEmail = (data) =>
  axios.post(`${BASE_URL}/products/sendContactRequest`, data);
