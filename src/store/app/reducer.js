import { createReducer } from 'redux-act';

import {
  closeErrorMessage,
  createItemFailure,
  createItemRequest,
  createItemSuccessful,
  deleteItemRequest,
  deleteItemSuccessful,
  editItemRequest,
  editItemSuccessful,
  getItemsByIdFailure,
  getItemsByIdRequest,
  getItemsByIdSuccessful,
  getItemsFailure,
  getItemsRequest,
  getItemsSuccessful,
  setSelectedItem,
  setOpenedCategories,
  sendContactRequestRequest,
  sendContactRequestSuccessful,
  sendContactRequestFailure,
  closeSuccessMessage,
  getProductFailure,
  getProductRequest,
  getProductSuccessful,
  setReviewedSubcategories,
  toggleDrawer,
  clearItems
} from './actions';

const INITIAL_STATE = {
  isDrawerOpened: false,
  categories: [],
  subcategories: [],
  products: [],
  subcategoriesById: [],
  productsById: {},
  isLoading: false,
  isLoadingItemsById: false,
  isProcessing: false,
  isCreated: false,
  isDeleted: false,
  showError: false,
  errorMessage: '',
  selectedItem: null,
  openedCategories: [],
  reviewedSubcategories: [],
  showSuccessMessage: false
};

export default createReducer(
  {
    [getItemsRequest]: (state) => ({ ...state, isLoading: true }),
    [getItemsSuccessful]: (state, data) => ({
      ...state,
      ...data,
      isLoading: false,
      isDeleted: false,
      isCreated: false
    }),
    [getItemsFailure]: (state) => ({ ...state, isLoading: false }),

    [getItemsByIdRequest]: (state) => ({ ...state, isLoadingItemsById: true }),
    [getItemsByIdSuccessful]: (state, data) => ({
      ...state,
      ...data,
      isLoadingItemsById: false,
      isDeleted: false,
      isCreated: false
    }),
    [getItemsByIdFailure]: (state) => ({ ...state, isLoadingItemsById: false }),

    [createItemRequest]: (state) => ({
      ...state,
      isProcessing: true,
      isCreated: false,
      showError: false,
      errorMessage: ''
    }),
    [createItemSuccessful]: (state) => ({ ...state, isProcessing: false, isCreated: true }),
    [createItemFailure]: (state, { errorMessage }) => ({
      ...state,
      isProcessing: false,
      isCreated: false,
      showError: true,
      errorMessage
    }),

    [editItemRequest]: (state) => ({ ...state, isProcessing: true }),
    [editItemSuccessful]: (state) => ({ ...state, isProcessing: false }),

    [deleteItemRequest]: (state) => ({ ...state, isProcessing: true, isDeleted: false }),
    [deleteItemSuccessful]: (state) => ({ ...state, isProcessing: false, isDeleted: true }),

    [closeErrorMessage]: (state) => ({ ...state, showError: false }),

    [setSelectedItem]: (state, payload) => ({ ...state, selectedItem: payload }),

    [setOpenedCategories]: (state, payload) => ({ ...state, openedCategories: payload }),
    [setReviewedSubcategories]: (state, payload) => ({
      ...state,
      reviewedSubcategories: [...state.reviewedSubcategories, payload]
    }),

    [sendContactRequestRequest]: (state) => ({ ...state, isProcessing: true }),
    [sendContactRequestSuccessful]: (state) => ({
      ...state,
      isProcessing: false,
      showSuccessMessage: true
    }),
    [sendContactRequestFailure]: (state) => ({ ...state, isProcessing: false }),

    [closeSuccessMessage]: (state) => ({ ...state, showSuccessMessage: false }),

    [getProductRequest]: (state) => ({ ...state, isLoading: true }),
    [getProductSuccessful]: (state, product) => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        product
      },
      isLoading: false
    }),
    [getProductFailure]: (state) => ({ ...state, isLoading: false }),

    [toggleDrawer]: (state) => ({ ...state, isDrawerOpened: !state.isDrawerOpened }),

    [clearItems]: (state, items) => ({ ...state, [items]: INITIAL_STATE[items] })
  },
  INITIAL_STATE
);
