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
      return {
        ...state,
        iduser: action.payload.user.iduser,
        name: action.payload.user.name,
        email: action.payload.user.email,
        handphone: action.payload.user.handphone,
        role: action.payload.user.role,
        isActive: action.payload.user.isActive,
        errorStatus: action.payload.error,
        errorMessage: action.payload.message,
      };
    case 'ACCOUNT_VERIFY_SUCCESS':
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
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
        ...state,
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
