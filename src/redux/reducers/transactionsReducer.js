const INITIAL_STATE = {
  transactions: [],
  allTransaction: [],
  detailTransaction: [],
  allDetailTransaction: [],
  reportTransaction: [],
  reportChart: [],
  error: '',
  message: '',
  success: false,
  idpayment: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHECKOUT':
      return {
        ...state,
        success: action.payload.success,
        idpayment: action.payload.idpayment,
        error: action.payload.error,
        message: action.payload.message,
      };
    case 'GET_TRANSACTIONS':
      console.log('transactionReducer.js GET_TRANSACTIONS: ', action.payload);
      return {
        ...state,
        transactions: action.payload,
      };
    case 'GET_DETAIL_TRANSACTION':
      console.log(
        'transactionsReducer.js GET_DETAIL_TRANSACTION: ',
        action.payload
      );
      return {
        ...state,
        detailTransaction: action.payload,
      };

    // case "PAY_TRANSACTION":
    //     console.log("transactionReducer.js PAY_TRANSACTION: ", action.payload)
    //     return {
    //         ...state,

    case 'GET_ALL_TRANSACTION':
      console.log(
        'transactionReducer.js GET_ALL_TRANSACTION: ',
        action.payload
      );
      return {
        ...state,
        allTransaction: action.payload,
      };
    case 'GET_ALL_DETAIL_TRANSACTION':
      console.log(
        'transactionReducer.js GET_ALL_DETAIL_TRANSACTION: ',
        action.payload
      );
      return {
        ...state,
        allDetailTransaction: action.payload,
      };
    case 'GET_REPORT_TRANSACTION':
      return {
        ...state,
        reportTransaction: action.payload,
      };
    case 'GET_REPORT_CHART':
      return {
        ...state,
        reportChart: action.payload,
      };
    default:
      return state;
  }
};
