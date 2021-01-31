import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LogoPharmaGo, no_data } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';
import { Login, ForgotPassword, Suggestions } from '..';
import { API_URL } from '../../support/urlApi';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  CardBody,
  Card,
} from 'reactstrap';
import axios from 'axios';
import {
  loginUser,
  forgotPassword,
  logoutUser,
  getCart,
} from '../../redux/actions';

const Navbar = (props) => {
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
  const [dropCartOpen, setDropCartOpen] = useState(false);

  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleCart = () => setDropCartOpen((prevState) => !prevState);
  const history = useHistory();

  const {
    errorStatus,
    errorMessage,
    iduser,
    role,
    products,
    cartUser,
    detailProduct,
    name,
  } = useSelector(({ usersReducer, ProductsReducer, CartReducer }) => {
    return {
      errorStatus: usersReducer.errorStatus,
      errorMessage: usersReducer.errorMessage,
      role: usersReducer.role,
      name: usersReducer.name,
      iduser: usersReducer.iduser,
      products: ProductsReducer.products,
      cartUser: CartReducer.cartUser,
      detailProduct: ProductsReducer.detailProduct,
    };
  });

  useEffect(() => {
    dispatch(getCart());
  }, []);

  // submit for login form
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(
      loginUser(email, password, () => {
        setVisibleAlert(true);
        setTimeout(() => {
          setVisible(false);
          history.push('/');
        }, 1000);
      })
    );
    setVisibleAlert(true);
    setTimeout(() => {
      setVisibleAlert(false);
    }, 3000);
  };

  //  open/close modal alert
  const openAlert = () => {
    setVisibleAlert(true);
  };

  const closeAlert = () => {
    setVisibleAlert(false);
  };

  //  open/close modal alert
  // const openAlertForPassword = () => {
  //   setVisibleAlertForgotPassword(true);
  // };

  // const closeAlertForPassword = () => {
  //   setVisibleAlertForgotPassword(false);
  // };

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

  // calculate qty cart
  const qtyCart = () => {
    let totalQty = 0;
    if (cartUser.length > 0) {
      cartUser.forEach((item) => {
        totalQty += parseInt(item.qty);
      });
      return totalQty;
    }
  };

  // limit name function
  const limitName = (item) => {
    if (item.length > 20) {
      let newName = '';
      let splited = [...item];
      splited.forEach((e, idx) => {
        if (idx < 20) {
          newName += e;
        }
      });
      newName += '...';
      return newName;
    } else {
      return item;
    }
  };

  // render dropdown cart
  const cartIsEmpty = () => {
    if (cartUser.length > 0) {
      return (
        <>
          <DropdownItem>
            <span style={{ letterSpacing: 1.5 }}>Total ({qtyCart()})</span>
            <span style={{ float: 'right' }}>
              <Link
                style={{ color: '#27ae60', fontWeight: 500, letterSpacing: 2 }}
                to='/cart'
              >
                Cart
              </Link>
            </span>
          </DropdownItem>
          <DropdownItem divider style={{ marginLeft: 7, marginRight: 7 }} />
          <div style={{ overflowY: 'auto', width: 400, maxHeight: 500 }}>
            {renderCart()}
          </div>
        </>
      );
    } else {
      return (
        <>
          <CardBody>
            <img src={no_data} className='image' width='10%' />
            <p style={{ textAlign: 'center', marginTop: 10 }}>
              Keranjang Kamu Kosong Nih ☹
            </p>
          </CardBody>
        </>
      );
    }
  };

  const renderCart = () => {
    console.log('check cart in navbar', cartUser);
    return cartUser.map((item, index) => {
      return (
        <>
          <Link
            to={`/product-detail?idproduct=${item.idproduct}`}
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={toggleCart}
          >
            <div className='card-tranparent d-flex'>
              <div style={{ flex: 1 }}>
                <img src={API_URL + item.product_image} width='100%' />
              </div>
              <div style={{ flex: 2, marginTop: 20 }}>
                <p style={{ fontSize: 14, fontWeight: '600' }}>
                  {limitName(item.name)}
                </p>
                <p style={{ fontSize: 12 }}>
                  {item.qty} {item.satuan}{' '}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  marginTop: 50,
                  color: '#f39c12',
                  fontWeight: '500',
                }}
              >
                <p>Rp.{item.price_pcs.toLocaleString()}</p>
              </div>
            </div>
          </Link>
          <DropdownItem divider style={{ marginLeft: 7, marginRight: 7 }} />
        </>
      );
    });
  };

  // Link to Register
  const linkToRegister = () => {
    history.push('/register');
    setVisible(false);
  };

  const onLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <div
      className='border-bottom pb-3 pt-3 '
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
                {/* CART menu */}
                <li className='mr-4'>
                  <Dropdown isOpen={dropCartOpen} toggle={toggleCart}>
                    <DropdownToggle
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                      }}
                      onClick={() => dispatch(getCart())}
                    >
                      <i className='large material-icons right-menu_icon'>
                        shopping_cart
                      </i>
                      <Badge
                        color='danger'
                        pill
                        style={{
                          marginRight: -30,
                          position: 'relative',
                          left: -15,
                          top: -20,
                        }}
                      >
                        {qtyCart()}
                      </Badge>
                    </DropdownToggle>
                    <DropdownMenu right style={{ borderRadius: 5 }}>
                      {cartIsEmpty()}
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li>
                  <Link to='/'>
                    <i className='large material-icons right-menu_icon'>
                      notifications
                    </i>
                  </Link>
                </li>
                <li className='ml-3'>
                  {/* user role menu */}
                  {iduser ? (
                    role === 'admin' ? (
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
                          <DropdownItem style={{ fontWeight: 'bold' }}>
                            {name}
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Dashboard Admin</DropdownItem>
                          <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            alignSelf: 'center',
                          }}
                        >
                          <i className='large material-icons right-menu_icon'>
                            account_circle
                          </i>
                        </DropdownToggle>
                        <DropdownMenu right style={{ width: '14rem' }}>
                          <DropdownItem
                            style={{
                              fontWeight: 'bold',
                              display: 'flex',
                            }}
                          >
                            <Card className='w-100 pl-5 pr-5 pt-2 pb-2'>
                              <span>{name}</span>
                            </Card>
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            style={{
                              display: 'flex',
                            }}
                          >
                            <i className='large material-icons mr-2'>
                              account_box
                            </i>{' '}
                            <span>Profile</span>
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            onClick={onLogout}
                            style={{
                              display: 'flex',
                            }}
                          >
                            <i className='large material-icons mr-2'>
                              exit_to_app
                            </i>
                            <span>Logout</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    )
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
                        <div className='d-flex mb-2'>
                          <i className='large material-icons right-menu_icon pr-1'>
                            login
                          </i>
                          <span>Login</span>
                        </div>
                      </DropdownToggle>
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

export default Navbar;
