import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { LogoPharmaGo } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';
import { Login, ForgotPassword, Suggestions } from '..';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import axios from 'axios';
import { loginUser, forgotPassword, logoutUser } from '../../redux/actions';
import { API_URL } from '../../support/urlApi';

const NavbarCom = (props) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
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
    ({ usersReducer, ProductsReducer }) => {
      return {
        errorStatus: usersReducer.errorStatus,
        errorMessage: usersReducer.errorMessage,
        role: usersReducer.role,
        iduser: usersReducer.iduser,
        products: ProductsReducer.products,
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
          history.push('/');
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
    axios
      .get(`${API_URL}/products/search?keyword=${query}`)
      .then(({ data }) => {
        setResults(data.products);
      });
  };

  // handle search
  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
      setOpenSearch(true);
      setQuery(e.target.value);
      if (query && query.length > 1) {
        if (query.length % 2 === 0) {
          getSearchProduct(query);
        }
      }
    } else {
      setOpenSearch(false);
    }
  };

  // Link to Register
  const linkToRegister = () => {
    history.push('/register');
    setVisible(false);
  };

  const onLogout = () => {
    dispatch(
      logoutUser(() => {
        setLoading(true);
        history.push('/');
      })
    );
  };

  return (
    <div
      className='border-bottom pb-3 pt-3'
      style={{ backgroundColor: 'white' }}
    >
      <div className='container pt-2 pb-0'>
        <div className='row'>
          <div className='col-3 align-self-center'>
            <Link to='/'>
              <img src={LogoPharmaGo} className='image' alt='pharmago' />
            </Link>
          </div>
          <div className='col-6 align-self-center'>
            <Suggestions
              results={results}
              searchRef={searchRef}
              handleInputChange={handleInputChange}
              openSearch={openSearch}
            />
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
                <li className='mr-2'>
                  <Link to='/'>
                    <i className='large material-icons right-menu_icon'>
                      notifications
                    </i>
                  </Link>
                </li>
                <li className='ml-3'>
                  {/* user role menu */}
                  {localStorage.getItem('token') && role === 'admin' ? (
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
                        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : localStorage.getItem('token') && role === 'user' ? (
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
                        <DropdownItem>Profile</DropdownItem>
                        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                        onClick={openModal}
                      >
                        <i className='large material-icons right-menu_icon'>
                          input
                        </i>
                      </DropdownToggle>
                      {/* <DropdownMenu right>
                        <DropdownItem onClick={openModal}>Login</DropdownItem>
                      </DropdownMenu> */}
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
        linkToRegister={linkToRegister}
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

// 41b304dfe5d68753df30e526f2b2aecc
