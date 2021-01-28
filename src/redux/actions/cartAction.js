import Axios from "axios"
import { API_URL } from "../../support/urlApi"

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            console.log("addcart Action cek data: ", data)
            let post = await Axios.post(API_URL + '/cart/add', { ...data })
            dispatch(getCart())
            console.log(post.data.message)
        } catch (error) {
            console.log(error)
        }
    }
}

export const addCustomCart = (cartCustom, cartCustom_detail) => {
    return async (dispatch) => {
        try {
            console.log("addCustomCart Action cek data: ", cartCustom, cartCustom_detail)
            let post = await Axios.post(API_URL + '/cart/addCustom', { cartCustom, cartCustom_detail })
            console.log("cek addcustomcart Action: ", post.data)

            dispatch(getCustomCart())
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCart = () => {
    return async (dispatch) => {
        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            if (localStorage.getItem('token')) {
                let get = await Axios.get(API_URL + `/cart`, headers)
                dispatch({
                    type: 'GET_CART',
                    payload: get.data.cartUser
                });
            }
            dispatch(getCustomCart())

        } catch (error) {
            console.log(error)
        }
    }
}

export const getCustomCart = () => {
    return async (dispatch) => {
        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            if (localStorage.getItem('token')) {
                let get = await Axios.get(API_URL + `/cart/custom`, headers)
                dispatch({
                    type: 'GET_CUSTOM_CART',
                    payload: get.data.customCart
                });
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (idcart) => {
    return async (dispatch) => {
        console.log('deleteCart action idcart: ', idcart)
        try {
            let del = await Axios.delete(API_URL + `/cart/delcart/${idcart}`)
            console.log(del.data.message)
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCustomCart = (idcartCustom) => {
    return async (dispatch) => {
        console.log('deleteCartCustom action idcart: ', idcartCustom)
        try {
            let del = await Axios.delete(API_URL + `/cart/delcustom/${idcartCustom}`)
            console.log(del.data.message)
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateQty = (qty, type, id) => {
    return async (dispatch) => {
        try {
            if (type === 'inc') {
                qty += 1
            } else if (type === 'dec') {
                qty -= 1
            }

            let update = await Axios.patch(API_URL + `/cart/updQty/${id}`, { qty })

            console.log("cek update data: ", update.data.cartUser)
            dispatch({
                type: 'GET_CART',
                payload: update.data.cartUser
            });

        } catch (error) {
            console.log(error)
        }
    }
}

export const updateNote = (idcart, note) => {
    return async (dispatch) => {
        try {
            let update = await Axios.patch(API_URL + `/cart/updNote/${idcart}`, { note })
            dispatch({
                type: 'GET_CART',
                payload: update.data.cartUser
            });
        } catch (error) {
            console.log(error)
        }
    }
}