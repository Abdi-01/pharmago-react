import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Reducer } from './redux/reducers';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

const storeReducer = createStore(Reducer, {}, applyMiddleware(ReduxThunk));
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={storeReducer}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
