import Axios from "axios"
import { API_URL } from "../../support/urlApi"

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            console.log("addcart Action cek data: ", data)
            let post = await Axios.post(API_URL + '/cart/add', { ...data })
            console.log(post.data.message)
        } catch (error) {
            console.log(error)
        }
    }
}