import Axios from "axios"
import { API_URL } from "../../support/urlApi"

export const getProducts = (category) => {
    return async (dispatch) => {
        try {
            let get = ''
            if (category) {
                get = await Axios.get(API_URL + `/products${category}`)
                console.log(API_URL + `/products/${category}`)
            } else {
                get = await Axios.get(API_URL + '/products')
            }
            // console.log("productAction.js GetProducts: ", get.data)
            dispatch({
                type: "GET_PRODUCTS",
                payload: get.data.products
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDetail = (detail) => {
    return async (dispatch) => {
        try {
            let get = await Axios.get(API_URL + `/products${detail}`)
            // console.log("productAction.js GetDetail: ", get.data)
            dispatch({
                type: 'GET_DETAIL',
                payload: get.data.products
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCustomProducts = () => {
    return async (dispatch) => {
        try {
            let get = await Axios.get(API_URL + `/products/custom`)
            // console.log("productAction.js GetCustomProducts: ", get.data)
            dispatch({
                type: 'GET_CUSTOM_PRODUCTS',
                payload: get.data.customProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCategory = () => {
    return async (dispatch) => {
        try {
            let get = await Axios.get(API_URL + `/products/category`)
            dispatch({
                type: 'GET_CATEGORY',
                payload: get.data.category
            })
        } catch (error) {
            console.log(error)
        }
    }
}

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