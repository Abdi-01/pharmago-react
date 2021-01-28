const INITIAL_STATE = {
    cartUser: [],
    customCart: []
    // refresh: false,
    // totalPayment: 0,
    // success: false,
    // error: '',
    // message: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_CART":
            // console.log("CEK GET_CART REDUCER: ", action.payload)
            return {
                ...state,
                cartUser: action.payload
            }
        case "GET_CUSTOM_CART":
            console.log("CEK GET_CUSTOM_CART REDUCER: ", action.payload)
            return {
                ...state,
                customCart: action.payload
            }
        case "ADD_CUSTOM_CART":
            console.log("CEK ADD_CUSTOM_CART REDUCER: ", action.payload)
            return {
                ...state,
                customCart: action.payload
            }
        default:
            return state;
    }
}