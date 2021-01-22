import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CartReducer from './cartReducer';


export const Reducer = combineReducers({
    ProductsReducer,
    CartReducer
})