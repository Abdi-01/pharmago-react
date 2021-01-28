const INITIAL_STATE = {
  iduser: '',
  name: null,
  email: '',
  handphone: '',
  role: '',
  isActive: false,
  errorMessage: '',
  errorStatus: null,
  defaultAddress: [],
  cartUser: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'KEEP_LOGIN':
      console.log('success', action.payload.message);
      return {
        ...state,
        iduser: action.payload.user[0].iduser,
        name: action.payload.user[0].name,
        email: action.payload.user[0].email,
        handphone: action.payload.user[0].handphone,
        role: action.payload.user[0].role,
        isActive: action.payload.user[0].isActive,
        errorStatus: action.payload.error,
        errorMessage: action.payload.message,
      };
    case 'ACCOUNT_VERIFY_SUCCESS':
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
      console.log('reducer', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message,
        errorStatus: action.payload.error,
      };
    case 'REGISTER_FAILED':
    case 'FORGOT_PASSWORD_FAILED':
    case 'LOGIN_FAILED':
      console.log('fail forgot password', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message,
        errorStatus: action.payload.error,
      };
    case 'GET_DEFAULT_ADDRESS':
      // console.log('defaultadress', action.payload);
      return {
        defaultAddress: action.payload.defaultAddress,
      };
    case 'GET_CART':
      console.log('GET_CART', action.payload);
      return {
        ...state,
        cartUser: action.payload,
      };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};
