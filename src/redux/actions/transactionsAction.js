import Axios from "axios"
import { API_URL } from '../../support/urlApi';

export const addTransaction = (checkout, idcart, ongkir, total_payment, iduser_address) => {
    return async (dispatch) => {
        try {
            console.log("cek body checkout (checkout): ", checkout)
            console.log("cek body idcart (checkout): ", idcart)
            let post = await Axios.post(API_URL + '/transactions/add', { checkout, idcart, ongkir, total_payment, iduser_address })
            console.log("cek addtransaction Action: ", post.data)
            dispatch({
                type: "CHECKOUT",
                payload: post.data
            })
        } catch (error) {
            console.log("checkout Action: ", error)
        }
    }
}

export const getTransaction = (iduser) => {
    return async (dispatch) => {
        try {
            let get = await Axios.get(API_URL + `/transactions/${iduser}`)
            console.log('transactionAction.js getTransaction: ', get.data)
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: get.data.transactions
            })
        } catch (error) {
            console.log('transactionAction.js get error: ', error)
        }
    }
}

export const payment = (idtransaction) => {
    return async (dispatch) => {
        try {
            let pay = await Axios.patch(API_URL + `/transactions/payment/${idtransaction}`)
            console.log('transactionAction.js payment: ', pay.data)
            // let get = await Axios.get(API_URL + `/transactions/${iduser}`)
            // dispatch({
            //     type: "GET_TRANSACTIONS",
            //     payload: get.data.transactions
            // })
        } catch (error) {
            console.log("transactionAction.js payment error: ", error)
        }
    }
}