const INITIAL_STATE = {
  products: [],
  search: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};
