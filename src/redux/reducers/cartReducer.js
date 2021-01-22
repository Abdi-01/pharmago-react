const INITIAL_STATE = {
    cartUser: [],
    // refresh: false,
    // totalPayment: 0,
    // success: false,
    // error: '',
    // message: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_CART":
            console.log("CEK GET_CART REDUCER: ", action.payload)
            return {cartUser: action.payload}
    
        default:
            return state;
    }
}