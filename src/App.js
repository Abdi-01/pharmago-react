import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import { Footer, Navbar } from './components';
import {
  Home,
  Register,
  ResetPassword,
  NotFound,
  DashboardAdmin,
  Verify,
  AdminProduct,
  AdminProductDetail,
  AdminAddProduct,
} from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, keepLogin, getCategory } from './redux/actions';
import CartPage from './pages/CartPage';
import TransactionPage from './pages/TransactionPage';
import TransactionDetail from './pages/TransactionDetail';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
    dispatch(getProducts());
    dispatch(getCategory());
  }, []);

  const { role } = useSelector(({ usersReducer }) => {
    return {
      role: usersReducer.role,
    };
  });

  return (
    <div>
      {role !== 'admin' && <Navbar />}
      <Switch>
        <Route
          path='/'
          exact
          component={role === 'admin' ? DashboardAdmin : Home}
        />
        <Route path='/products' component={ProductPage} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/register' component={Register} />
        <Route path='/reset-password/:iduser' component={ResetPassword} />
        <Route path='/verify/:token' component={Verify} />

        {/* user role */}
        {role === 'admin' ? (
          <>
            {' '}
            <Route path='/admin' component={DashboardAdmin} />
            <Route path='/admin-product' component={AdminProduct} />
            <Route
              path='/admin-product-detail'
              component={AdminProductDetail}
            />
            <Route path='/admin-add-product' component={AdminAddProduct} />
          </>
        ) : (
          <>
            <Route path='/order-list' component={TransactionPage} />
            <Route path='/order-detail' component={TransactionDetail} />
            <Route path='/cart' component={CartPage} />
          </>
        )}
        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
