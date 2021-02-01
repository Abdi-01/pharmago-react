const INITIAL_STATE = {
  products: [],
  detailProduct: [],
  customProducts: [],
  category: [],
  search: [],
  errorStatus: null,
  allProducts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      console.log('productsReducer.js GET_PRODUCTS: ', action.payload);
      return {
        ...state,
        products: action.payload,
      };
    case 'RESET_PRODUCTS':
      console.log('productsReducer.js RESET ', action.payload);
      return {
        ...state,
        products: [],
      };
    case 'GET_CUSTOM_PRODUCTS':
      console.log('productsReducer.js GET_CUSTOM_PRODUCTS: ', action.payload);
      return {
        ...state,
        customProducts: action.payload,
      };
    case 'GET_PRODUCTS_SEARCH':
      return {
        ...state,
        search: action.payload,
      };
    case 'GET_DETAIL':
      console.log('productsReducer.js GET_DETAIL: ', action.payload);
      return {
        ...state,
        detailProduct: action.payload,
      };
    case 'GET_CATEGORY':
      console.log('productsReducer.js GET_CATEGORY: ', action.payload);
      return {
        ...state,
        category: action.payload,
      };
    case 'ADD_PRODUCT_SUCCESS':
      console.log('productsReducer.js ADD_PRODUCT_SUCCESS: ', action.payload);
      return {
        ...state,
        errorStatus: action.payload.errorStatus,
      };
    case 'GET_ALL_PRODUCTS':
      console.log('productsReducer.js GET_ALL_PRODUCTS: ', action.payload);
      return {
        ...state,
        allProducts: action.payload,
      };
    case 'ADD_PRODUCT_FAIL':
      console.log('productsReducer.js ADD_PRODUCT_FAIL: ', action.payload);
      return {
        ...state,
        errorStatus: action.payload.errorStatus,
      };
    default:
      return state;
  }
};
