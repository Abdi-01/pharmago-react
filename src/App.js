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
  AdminEditProduct,
  AdminTransaksi,
  AdminTransaksiDetail,
} from './pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  keepLogin,
  getCategory,
  getCart,
  getAllTransaction,
} from './redux/actions';
import CartPage from './pages/CartPage';
import TransactionPage from './pages/TransactionPage';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
    dispatch(getAllProducts());
    dispatch(getCategory());
    dispatch(getCart());
    dispatch(getAllTransaction());
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
            <Route
              path='/admin-edit-product/:idproduct'
              component={AdminEditProduct}
            />
            <Route path='/admin-transaksi' component={AdminTransaksi} />
            <Route
              path='/admin-transaksi-detail'
              component={AdminTransaksiDetail}
            />
          </>
        ) : (
          role === 'user' && (
            <>
              <Route path='/order-list' component={TransactionPage} />
              <Route path='/cart' component={CartPage} />
            </>
          )
        )}
        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
