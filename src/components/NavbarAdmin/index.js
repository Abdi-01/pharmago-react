import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/actions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavbarBrand,
} from 'reactstrap';

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const history = useHistory();
  const { name } = useSelector(({ usersReducer }) => {
    return {
      name: usersReducer.name,
    };
  });

  const onLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <Navbar
      color='light'
      light
      expand='md'
      className='pt-3 pb-3 pl-3 pr-5 shadow navbar sticky-top navbar-light bg-light'
    >
      <NavbarBrand
        className='mr-auto'
        style={{
          fontSize: '20px',
          paddingLeft: '30px',
        }}
      >
        {name ? `Halo, ${name}` : 'PharmaGO'}!!
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse
        isOpen={isOpen}
        navbar
        style={{ flexBasis: '12%', flexGrow: 0 }}
      >
        <Nav classname='mr-auto' navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav style={{ fontSize: '20px', color: 'black' }}>
              <NavbarText
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  paddingLeft: '30px',
                  position: 'relative',
                }}
              >
                Menu Utama
              </NavbarText>
              <i
                className='material-icons'
                style={{
                  position: 'absolute',
                  fontSize: '2.6rem',
                  color: 'grey',
                }}
              >
                arrow_drop_down
              </i>
            </DropdownToggle>
            <DropdownMenu left style={{ padding: 20 }}>
              <DropdownItem>
                <Link to='/' className='text-black-50'>
                  Dashboard
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to='/admin-product' className='text-black-50'>
                  {' '}
                  Master Produk
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to='/admin-transaksi' className='text-black-50'>
                  {' '}
                  Transaksi
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={onLogout} className='text-black-50'>
                Logout
              </DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
