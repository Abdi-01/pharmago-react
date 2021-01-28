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
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav style={{ fontSize: '20px', color: 'black' }}>
              <NavbarText
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  paddingLeft: '30px',
                }}
              >
                Menu Utama
              </NavbarText>
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem>
                <Link to='/admin-product'> Master Produk</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Transaksi</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Report</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={onLogout}>Logout</DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText
          style={{
            fontSize: '20px',
            paddingLeft: '30px',
          }}
        >
          {name ? `Halo, ${name}` : 'PharmaGO'}!!
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
