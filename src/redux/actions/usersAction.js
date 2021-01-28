import Axios from 'axios';
import { API_URL } from '../../support/urlApi';

export const registerUser = (data, cb) => {
  return async (dispatch) => {
    try {
      const results = await Axios.post(API_URL + `/users/register`, { data });
      console.log('check registerUser', results);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: results.data,
      });
      cb();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: 'REGISTER_FAILED',
        payload: error.response.data,
      });
    }
  };
};

export const accountVerify = (otp, token, cb) => {
  return async (dispatch) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const results = await Axios.patch(
        API_URL + `/users/account-verify`,
        {
          otp,
        },
        headers
      );
      dispatch({
        type: 'ACCOUNT_VERIFY_SUCCESS',
        payload: results.data,
      });
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};

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
      if (results) {
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
      console.log(error);
      dispatch({
        type: 'LOGIN_FAILED',
        payload: error.response ? error.response.data : error.message,
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

export const getDefaultAddress = () => {
  return async (dispatch) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      if (localStorage.getItem('token')) {
        let results = await Axios.get(API_URL + `/users/defaultAddress`, headers);
        dispatch({
          type: 'GET_DEFAULT_ADDRESS',
          payload: results.data,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const logoutUser = (cb) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      });
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};
