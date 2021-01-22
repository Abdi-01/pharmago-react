import Axios from 'axios';
import { APIURL } from '../config/path';

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const results = await Axios.get(APIURL + `/products`);
      console.log('action getProducts', results.data.products);
      dispatch({
        type: 'GET_PRODUCTS',
        payload: results.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
