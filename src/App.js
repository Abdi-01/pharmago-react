import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import { NavbarCom } from './components';
import { Home, ResetPassword, SearchResult } from './pages';
import { useDispatch } from 'react-redux';
import { getProducts, keepLogin } from './redux/actions';
import CartPage from './pages/CartPage';
import TransactionPage from './pages/TransactionPage';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProducts());
    dispatch(keepLogin());
  }, []);

  return (
    <div>
      <NavbarCom />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search' component={SearchResult} />
        <Route path='/products' component={ProductPage} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/cart' component={CartPage} />
        <Route path='/reset-password/:iduser' component={ResetPassword} />
        <Route path='/order-list' component={TransactionPage} />
      </Switch>
    </div >
  )
}


export default App;