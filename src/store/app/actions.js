import { createAction } from 'redux-act';
import * as api from '../../api';
import store from '../index';

export const getItemsRequest = createAction('getItemsRequest');
export const getItemsSuccessful = createAction('getItemsSuccessful');
export const getItemsFailure = createAction('getItemsFailure');

export const getItemsByIdRequest = createAction('getItemsByIdRequest');
export const getItemsByIdSuccessful = createAction('getItemsByIdSuccessful');
export const getItemsByIdFailure = createAction('getItemsByIdFailure');

export const createItemRequest = createAction('createItemRequest');
export const createItemSuccessful = createAction('createItemSuccessful');
export const createItemFailure = createAction('createItemFailure');

export const editItemRequest = createAction('editItemRequest');
export const editItemSuccessful = createAction('editItemSuccessful');

export const deleteItemRequest = createAction('deleteItemRequest');
export const deleteItemSuccessful = createAction('deleteItemSuccessful');

export const closeErrorMessage = createAction('closeErrorMessage');
export const closeSuccessMessage = createAction('closeSuccessMessage');

export const setSelectedItem = createAction('setSelectedItem');

export const setOpenedCategories = createAction('setOpenedCategories');
export const setReviewedSubcategories = createAction('setReviewedSubcategories');

export const sendContactRequestRequest = createAction('sendContactRequestRequest');
export const sendContactRequestSuccessful = createAction('sendContactRequestSuccessful');
export const sendContactRequestFailure = createAction('sendContactRequestFailure');

export const getProductRequest = createAction('getProductRequest');
export const getProductSuccessful = createAction('getProductSuccessful');
export const getProductFailure = createAction('getProductFailure');

export const toggleDrawer = createAction('toggleDrawer');

export const clearItems = createAction('clearItems');

export const getCategoriesWithSubcategories = () => (dispatch) => {
  dispatch(getItemsRequest());
  api
    .getCategoriesWithSubcategories()
    .then((res) => dispatch(getItemsSuccessful({ categories: res?.data?.data })))
    .catch((err) => {
      dispatch(getItemsFailure());
      console.log(err);
    });
};

export const getItems = (data) => (dispatch) => {
  dispatch(getItemsRequest(data));
  api
    .getItems(data)
    .then((res) => dispatch(getItemsSuccessful({ [data.type]: res?.data?.data })))
    .catch((err) => {
      dispatch(getItemsFailure());
      console.log(err);
    });
};

const setSelected = (dispatch, item, isProduct) => {
  const { categoryId, categoryName, subcategoryId, subcategoryName } = item;
  dispatch(
    setSelectedItem({
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      ...(isProduct && {
        product: item
      })
    })
  );
  const openedCategories = store.getState()?.appReducer?.openedCategories;
  const isCategoryOpened = openedCategories?.includes(categoryId);
  if (!isCategoryOpened && categoryId) {
    dispatch(setOpenedCategories([...openedCategories, categoryId]));
  }
};

export const getItemsById = (data) => (dispatch) => {
  dispatch(getItemsByIdRequest(data));
  api
    .getItemsById(data)
    .then((res) => {
      const responseData = res?.data?.data;
      const collection = responseData?.[data.type];
      dispatch(getItemsByIdSuccessful({ [`${data.type}ById`]: responseData }));
      const categories = store.getState()?.appReducer.categories;

      const selectedCategory = categories?.find((e) =>
        e.subcategories?.some((i) => i._id === data._id)
      );
      const selectedSubcategory = selectedCategory?.subcategories?.find((e) => e._id === data._id);

      const item = collection?.[0] || {
        categoryId: selectedSubcategory?.categoryId,
        categoryName: selectedSubcategory?.categoryName,
        subcategoryId: selectedSubcategory?._id,
        subcategoryName: selectedSubcategory?.name
      };
      setSelected(dispatch, item);
    })
    .catch((err) => {
      dispatch(getItemsByIdFailure());
      console.log(err);
    });
};

export const createItem = (data) => async (dispatch) => {
  dispatch(createItemRequest(data));
  await api
    .createItem(data)
    .then(() => dispatch(createItemSuccessful()))
    .catch((err) => {
      dispatch(createItemFailure({ errorMessage: err.response.data.error }));
      console.log(err);
    });
};

export const editItem = (data) => (dispatch) => {
  dispatch(editItemRequest(data));
  api
    .editItem(data)
    .then(() => dispatch(editItemSuccessful()))
    .catch((err) => console.log(err));
};

export const deleteItem = (data) => (dispatch) => {
  dispatch(deleteItemRequest(data));
  api
    .deleteItem(data)
    .then(() => dispatch(deleteItemSuccessful()))
    .catch((err) => console.log(err));
};

export const sendContactRequest = (data) => (dispatch) => {
  dispatch(sendContactRequestRequest(data));
  api
    .sendContactRequestOnEmail(data)
    .then(() => dispatch(sendContactRequestSuccessful()))
    .catch((err) => {
      dispatch(sendContactRequestFailure());
      console.log(err);
    });
};

export const getProduct = (_id) => (dispatch) => {
  dispatch(getProductRequest(_id));
  api
    .getProduct(_id)
    .then((res) => {
      const product = res?.data?.product;
      dispatch(getProductSuccessful(product));
      setSelected(dispatch, product, true);
    })
    .catch((err) => {
      dispatch(getProductFailure());
      console.log(err);
    });
};
