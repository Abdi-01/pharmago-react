import Axios from 'axios';
import { API_URL } from '../../support/urlApi';

export const loginUser = (email, password, cb) => {
  return async (dispatch) => {
    try {
      const results = await Axios.post(API_URL + `/users/login`, {
        email,
        password,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: results.data,
      });
      cb();
      localStorage.setItem('token', results.data.token);
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      if (localStorage.getItem('token')) {
        let get = await Axios.get(API_URL + `/cart/${results.data.user[0].iduser}`, headers)
        localStorage.setItem(`refreshcart`, results.data.user[0].iduser);
        dispatch({
          type: 'GET_CART',
          payload: get.data.cartUser
        });
        let results = await Axios.get(API_URL + `/users/defaultAddress/${results.data.user[0].iduser}`);
        dispatch({
          type: 'GET_DEFAULT_ADDRESS',
          payload: results.data.defaultAddress
        });

      }
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: 'LOGIN_FAILED',
        payload: error.response.data,
      });
    }
  };
};

export const forgotPassword = (email, cb) => {
  return async (dispatch) => {
    try {
      const results = await Axios.post(API_URL + `/users/forgot-password`, {
        email,
      });
      console.log('action forgotPassword', results);
      dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: results.data,
      });
      cb();
    } catch (error) {
      console.log('action error forgotPassword', error.response);
      dispatch({
        type: 'FORGOT_PASSWORD_FAILED',
        payload: error.response.data,
      });
    }
  };
};

export const resetPassword = (password, iduser, cb) => {
  return async (dispatch) => {
    try {
      const results = await Axios.post(API_URL + `/users/reset-password`, {
        password,
        iduser,
      });
      dispatch({
        type: 'RESET_PASSWORD_SUCCESS',
        payload: results.data,
      });
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      if (localStorage.getItem('token')) {
        let results = await Axios.get(API_URL + `/users/keep-login`, headers);
        localStorage.setItem('token', results.data.token);
        dispatch({
          type: 'KEEP_LOGIN',
          payload: results.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDefaultAddress = (iduser) => {
  return async (dispatch) => {
    try {
      let results = await Axios.get(API_URL + `/users/defaultAddress/${iduser}`);
      dispatch({
        type: 'GET_DEFAULT_ADDRESS',
        payload: results.data,
      });
    } catch (error) {
      console.log(error)
    }
  }
}