import React from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './suggestion.css';

const Suggestions = ({ results, searchRef, handleInputChange, openSearch }) => {
  return (
    <UncontrolledDropdown style={{ padding: 0 }}>
      <DropdownToggle
        style={{
          backgroundColor: 'white',
          border: 'white',
          width: '100%',
          padding: 0,
        }}
      >
        <form>
          <input
            type='select'
            className='form-control searchInputText'
            placeholder='Search for ...'
            ref={searchRef}
            onChange={handleInputChange}
          />
        </form>
      </DropdownToggle>
      {console.log('test', openSearch)}
      {openSearch && (
        <DropdownMenu className='mt-2 w-100' style={{ border: 'none' }}>
          {results.map((item) => (
            <div>
              <Link
                to={`/product-detail?idproduct=${item.idproduct}`}
                style={{ textDecoration: 'none' }}
              >
                <DropdownItem className='p-2'>
                  <div className='d-flex align-items-center'>
                    <img
                      src={item.product_image}
                      width='20%'
                      style={{
                        border: '1px solid #ced4da',
                        borderRadius: '20px',
                        marginRight: '2rem',
                      }}
                    />
                    <div>
                      <p>{item.name.toUpperCase()}</p>
                    </div>
                  </div>
                </DropdownItem>
              </Link>

              <DropdownItem divider />
            </div>
          ))}
        </DropdownMenu>
      )}
    </UncontrolledDropdown>
  );
};

export default Suggestions;
