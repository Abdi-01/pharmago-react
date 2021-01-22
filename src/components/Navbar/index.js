import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LogoPharmaGo } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, forgotPassword, getSearch } from '../../actions';
import './navbar.css';
import { Login, ForgotPassword, Suggestions } from '..';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import axios from 'axios';
import { APIURL } from '../../config/path';

const NavbarCom = (props) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleForgotPassword, setVisibleForgotPassword] = useState(false);
  const [visibleAlertForgotPassword, setVisibleAlertForgotPassword] = useState(
    false
  );

  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const history = useHistory();

  const { errorStatus, errorMessage, iduser, role, products } = useSelector(
    ({ usersReducer, productsReducer }) => {
      return {
        errorStatus: usersReducer.errorStatus,
        errorMessage: usersReducer.errorMessage,
        role: usersReducer.role,
        iduser: usersReducer.iduser,
        products: productsReducer.products,
      };
    }
  );

  // submit for login form
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(
      loginUser(email, password, () => {
        setVisibleAlert(true);
        setTimeout(() => {
          setVisible(false);
        }, 1500);
      })
    );
    setVisibleAlert(true);
    setTimeout(() => {
      setVisibleAlert(false);
    }, 2000);
  };

  //  open/close modal alert
  const openAlert = () => {
    setVisibleAlert(true);
  };

  const closeAlert = () => {
    setVisibleAlert(false);
  };

  //  open/close modal alert
  const openAlertForPassword = () => {
    setVisibleAlertForgotPassword(true);
  };

  const closeAlertForPassword = () => {
    setVisibleAlertForgotPassword(false);
  };

  // open/clsoe login modal
  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  //  open/close forgot password modal
  const openForgotPassword = () => {
    setVisibleForgotPassword(true);
    setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  const closeForgotPassword = () => {
    setVisibleForgotPassword(false);
  };

  // submit for forgot password modal
  const onForgotPassword = (data) => {
    let { email } = data;
    dispatch(
      forgotPassword(email, () => {
        setVisibleAlertForgotPassword(true);
        setTimeout(() => {
          setTimeout(() => {
            setVisibleAlertForgotPassword(false);
          }, 2000);
          setVisibleForgotPassword(false);
        }, 3000);
      })
    );
    setVisibleAlertForgotPassword(true);
    setTimeout(() => {
      setVisibleAlertForgotPassword(false);
    }, 2000);
  };

  // get search product
  const getSearchProduct = (query) => {
    axios.get(`${APIURL}/products?keyword=${query}`).then(({ data }) => {
      setResults(data.products);
    });
  };

  // search function
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (query && query.length > 1) {
      if (query.length % 2 === 0) {
        getSearchProduct(query);
      }
    }
  };

  return (
    <div className='border-bottom'>
      <div className='container pt-2 pb-0'>
        <div className='row'>
          <div className='col-3 align-self-center'>
            <Link to='/'>
              <img src={LogoPharmaGo} className='image' alt='pharmago' />
            </Link>
          </div>
          <div className='col-6 align-self-center'>
            <form>
              <div className='mb-3'>
                <input
                  className='form-control'
                  placeholder='Search for ...'
                  ref={searchRef}
                  onChange={handleInputChange}
                />
              </div>
              <Suggestions results={results} />
            </form>
          </div>
          <div className='col-3 align-selft-center'>
            <div className='d-flex justify-content-end right-menu'>
              <ul className='right-menu_ul'>
                <li className='mr-4'>
                  <Link to='/'>
                    <i className='large material-icons right-menu_icon'>
                      shopping_cart
                    </i>
                  </Link>
                </li>
                <li className='ml-2'>
                  <Link to='/'>
                    <i className='large material-icons right-menu_icon'>
                      notifications
                    </i>
                  </Link>
                </li>
                <li className='ml-3'>
                  {/* user role menu */}
                  {role === 'admin' ? (
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                        }}
                      >
                        <i className='large material-icons right-menu_icon'>
                          account_circle
                        </i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>Dashboard Admin</DropdownItem>
                      </DropdownMenu>
                      <DropdownMenu right>
                        <DropdownItem>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                        }}
                      >
                        <i className='large material-icons right-menu_icon'>
                          input
                        </i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={openModal}>Login</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* login modal */}
      <Login
        visible={visible}
        closeModal={closeModal}
        onSubmit={onSubmit}
        openAlert={openAlert}
        closeAlert={closeAlert}
        visibleAlert={visibleAlert}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        openForgotPassword={openForgotPassword}
      />

      {/* forgot password modal */}
      <ForgotPassword
        visibleForgotPassword={visibleForgotPassword}
        visibleAlert={visibleAlertForgotPassword}
        closeForgotPassword={closeForgotPassword}
        openForgotPassword={openForgotPassword}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        submit={onForgotPassword}
      />
    </div>
  );
};

export default NavbarCom;
