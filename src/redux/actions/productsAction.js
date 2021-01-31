import Axios from 'axios';
import { API_URL } from '../../support/urlApi';

export const getProducts = (category) => {
  return async (dispatch) => {
    try {
      let get = '';
      if (category) {
        get = await Axios.get(API_URL + `/products${category}`);
        console.log(API_URL + `/products/${category}`);
      } else {
        get = await Axios.get(API_URL + '/products');
      }
      // console.log("productAction.js GetProducts: ", get.data)
      dispatch({
        type: 'GET_PRODUCTS',
        payload: get.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (detail) => {
  return async (dispatch) => {
    try {
      let get = await Axios.get(API_URL + `/products${detail}`);
      // console.log("productAction.js GetDetail: ", get.data)
      dispatch({
        type: 'GET_DETAIL',
        payload: get.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCustomProducts = () => {
  return async (dispatch) => {
    try {
      let get = await Axios.get(API_URL + `/products/custom`);
      // console.log("productAction.js GetCustomProducts: ", get.data)
      dispatch({
        type: 'GET_CUSTOM_PRODUCTS',
        payload: get.data.customProducts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      let get = await Axios.get(API_URL + `/products/category`);
      dispatch({
        type: 'GET_CATEGORY',
        payload: get.data.category,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductSearch = () => {
  return async (dispatch) => {
    try {
      const results = await Axios.get(API_URL + `/products/search`);
      console.log('action getProducts', results.data.products);
      dispatch({
        type: 'GET_PRODUCTS_SEARCH',
        payload: results.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* Admin product action*/
export const addProduct = (data, file, cb) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();

      formData.append('data', JSON.stringify(data));
      formData.append('file', file);

      const results = await Axios.post(API_URL + `/products`, formData);
      dispatch({
        type: 'ADD_PRODUCT_SUCCESS',
        payload: results.data,
      });

      dispatch(getProducts);

      // callback function
      cb();
    } catch (error) {
      dispatch({
        type: 'ADD_PRODUCT_FAIL',
        payload: error.response.data,
      });
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      let results = await Axios.get(API_URL + `/products/all-products`);
      dispatch({
        type: 'GET_ALL_PRODUCTS',
        payload: results.data.dataProducts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (idproduct, data, file, cb) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();

      formData.append('data', JSON.stringify(data));
      formData.append('idproduct', JSON.stringify(idproduct));
      formData.append('file', file);

      let results = await Axios.put(
        API_URL + `/products/edit-product/${idproduct}`,
        formData
      );
      // callback function for redirect
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (idproduct) => {
  return async (dispatch) => {
    try {
      const results = await Axios.patch(
        API_URL + `/products/delete-product/${idproduct}`
      );
      dispatch({
        type: 'DELETE_PRODUCT_SUCCESS',
      });
      dispatch(getAllProducts());
    } catch (error) {
      console.log(error);
    }
  };
};
