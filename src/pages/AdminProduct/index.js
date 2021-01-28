import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { NavbarAdmin } from '../../components';
import { Button, Table } from 'reactstrap';

const AdminProduct = (props) => {
  const history = useHistory();
  const { products } = useSelector(({ usersReducer, ProductsReducer }) => {
    return {
      name: usersReducer.name,
      products: ProductsReducer.products,
    };
  });

  const handleButtonDetail = (idx) => {
    return history.push('/admin-product-detail', { index: idx });
  };

  // render product lists
  const renderProducts = () => {
    return products.map((item, idx) => {
      return (
        <tr className='text-center' key={idx}>
          <th>{idx + 1}</th>
          <td className='text-left'>{item.name}</td>
          <td>Rp. {item.price_pcs.toLocaleString()}</td>
          <td className='text-right'>
            {Math.floor(item.stock_pcs)} {item.satuan}
          </td>
          <th>
            <Button
              color='success'
              size='sm mr-4'
              onClick={() => handleButtonDetail(idx)}
            >
              Detail Produk
            </Button>
            <Button outline size='sm'>
              Edit Produk
            </Button>
          </th>
        </tr>
      );
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-8'>
          <h3 className='text-center mb-4'>Master Produk</h3>
          <hr />
          <div className='row'>
            <div className='col-12 d-flex justify-content-end'>
              <Button
                color='success'
                size='sm mb-3'
                onClick={() => history.push('/admin-add-product')}
              >
                Tambah Produk
              </Button>
            </div>
          </div>
          <Table hover bordered>
            <thead>
              <tr className='text-center'>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
