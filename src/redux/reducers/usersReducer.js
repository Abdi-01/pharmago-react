const INITIAL_STATE = {
  iduser: '',
  name: '',
  email: '',
  handphone: '',
  role: '',
  isActive: false,
  errorMessage: '',
  errorStatus: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'KEEP_LOGIN':
      // console.log('success', action.payload);
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
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
      // console.log('success forgot password', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message,
        errorStatus: action.payload.error,
      };
    case 'FORGOT_PASSWORD_FAILED':
    case 'LOGIN_FAILED':
      // console.log('fail forgot password', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message,
        errorStatus: action.payload.error,
      };
    default:
      return state;
  }
};
