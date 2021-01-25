const INITIAL_STATE = {
    products: [],
    detailProduct: [],
    category: [],
    search: []
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            console.log('productsReducer.js GET_PRODUCTS: ', action.payload)
            return {
                ...state,
                products: action.payload
            }
        case "GET_CUSTOM_PRODUCTS":
            console.log('productsReducer.js GET_CUSTOM_PRODUCTS: ', action.payload)
            return {
                ...state,
                customProducts: action.payload
            }
        case "GET_PRODUCTS_SEARCH":
            return {
                ...state,
                search: action.payload
            }
        case "GET_DETAIL":
            console.log('productsReducer.js GET_DETAIL: ', action.payload)
            return {
                ...state,
                detailProduct: action.payload
            }
        case "GET_CATEGORY":
            console.log('productsReducer.js GET_CATEGORY: ', action.payload)
            return {
                ...state,
                category: action.payload
            }

        default:
            return state;
    }
}