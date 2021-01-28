import React from 'react';
import { Navbar } from 'reactstrap';

const Footer = () => {
  return (
    <div style={{ border: '1px solid #ccc' }} className='mt-5'>
      <Navbar className='container d-flex fle-row justify-content-end align-items-center'>
        <h4 style={{ fontSize: '12px', color: 'black', paddingTop: '10px' }}>
          © 2021 Hak Cipta Terpelihara PT PharmaGO Indonesia
        </h4>
      </Navbar>
    </div>
  );
};

export default Footer;
