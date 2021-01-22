import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavbarCom } from './components';
import { getProducts, keepLogin } from './actions';

import { Home, ResetPassword, SearchResult } from './pages';
import { useDispatch } from 'react-redux';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(keepLogin());
  }, []);

  return (
    <div>
      <NavbarCom />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search' component={SearchResult} />
        <Route path='/reset-password/:iduser' component={ResetPassword} />
      </Switch>
    </div>
  );
};

export default App;
