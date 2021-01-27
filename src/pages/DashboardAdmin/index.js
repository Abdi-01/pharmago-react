import React, { useState } from 'react';
import { NavbarAdmin } from '../../components';

const DashboardAdmin = () => {
  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-8'>
          <h3 className='text-center mb-5'>
            Selamat Datang di Dashboard Admin
          </h3>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
