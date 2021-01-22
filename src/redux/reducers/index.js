import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CartReducer from './cartReducer';
import usersReducer from './usersReducer';

export const Reducer = combineReducers({
    ProductsReducer,
    CartReducer,
    usersReducer
})