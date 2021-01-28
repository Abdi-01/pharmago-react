import Axios from 'axios';
import { API_URL } from '../../support/urlApi';

export const addToCart = (data) => {
  return async (dispatch) => {
    try {
      console.log('addcart Action cek data: ', data);
      let post = await Axios.post(API_URL + '/cart/add', { ...data });
      dispatch(getCart());
      console.log(post.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCart = (iduser) => {
  return async (dispatch) => {
    console.log('getcart action iduser: ', iduser);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      if (localStorage.getItem('token')) {
        let get = await Axios.get(API_URL + `/cart/${iduser}`, headers);
        dispatch({
          type: 'GET_CART',
          payload: get.data.cartUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCart = (idcart) => {
  return async (dispatch) => {
    console.log('deleteCart action idcart: ', idcart);
    try {
      let del = await Axios.delete(API_URL + `/cart/${idcart}`);
      console.log(del.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateQty = (qty, type, id) => {
  return async (dispatch) => {
    try {
      if (type === 'inc') {
        qty += 1;
      } else if (type === 'dec') {
        qty -= 1;
      }

      let update = await Axios.patch(API_URL + `/cart/updQty/${id}`, { qty });

      console.log('cek update data: ', update.data);
    } catch (error) {
      console.log(error);
    }
  };
};
