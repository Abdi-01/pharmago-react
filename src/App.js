import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import { Footer, NavbarCom } from './components';
import {
  Home,
  Register,
  ResetPassword,
  NotFound,
  DashboardAdmin,
} from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { keepLogin } from './redux/actions';
import Verify from './pages/Verify';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
  }, []);

  const { role } = useSelector(({ usersReducer }) => {
    return {
      role: usersReducer.role,
    };
  });

  let token = localStorage.getItem('token');

  return (
    <div>
      <NavbarCom />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/products' component={ProductPage} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/register' component={Register} />
        <Route path='/reset-password/:iduser' component={ResetPassword} />
        <Route path='/verify/:token' component={Verify} />
        {token && role === 'admin' && (
          <Route path='/admin' component={DashboardAdmin} />
        )}

        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
