import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { NavbarAdmin } from '../../components';
import {
  Button,
  Table,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  Input,
} from 'reactstrap';

const AdminTransaksi = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const history = useHistory();
  const { allProducts, allTransaction } = useSelector(
    ({ usersReducer, ProductsReducer, transactionsReducer }) => {
      console.log('alllllllllllllllllllllllllll', transactionsReducer.allTransaction)
      return {
        name: usersReducer.name,
        allProducts: ProductsReducer.allProducts,
        allTransaction: transactionsReducer.allTransaction,
      };
    }
  );

  const [search, setSearch] = useState([]);
  const onChangeSearch = (e) => {
    console.log(e.target.value);
    let ItemSelected = allTransaction.filter((elem, idx) => {
      let searchValue = elem.name.toLowerCase();
      // console.log(searchValue);
      return searchValue.indexOf(e.target.value) !== -1;
    });
    setSearch(ItemSelected);
  };

  // search function
  const renderSelected = search.length <= 0 ? allTransaction : search;
  // console.log(Boolean(search.length <= 0));

  const handleButtonDetail = (idx, idtransaction) => {
    return history.push('/admin-transaksi-detail', {
      index: idx,
      idTrx: idtransaction,
    });
  };

  // render product lists
  const renderTransactions = () => {
    if(renderSelected)
    return renderSelected.map((item, idx) => {
      return (
        <tr className='text-center' key={idx}>
          <th>{idx + 1}</th>
          <td className='text-left'>{item.invoice_number}</td>
          <td>{item.customer}</td>
          <td className='text-center'>
            {moment(item.created_at).format('LLL')}
          </td>
          <td className='text-center'>
            <span
              className={
                item.payment_status === 'paid'
                  ? 'badge bg-success text-white p-2'
                  : 'badge bg-danger text-white p-2'
              }
            >
              {item.payment_status}
            </span>
          </td>
          <td className='text-center'>{item.transaction_type}</td>
          <th>
            <Button
              color='primary'
              size='sm mr-4'
              onClick={() => handleButtonDetail(idx, item.idtransaction)}
            >
              Detail Transaksi
            </Button>
          </th>
        </tr>
      );
    });
  };

  // Sort Function
  const sortTrx = (tipe, urutan) => {
    setSearch([]);
    if (tipe === 'Pesanan' && urutan === 'ASC') {
      allTransaction.sort((a, b) => {
        let paymentA = a.payment_status.toUpperCase();
        let paymentB = b.payment_status.toUpperCase();
        if (paymentA < paymentB) {
          return -1;
        }
        if (paymentA > paymentB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Type' && urutan === 'ASC') {
      allTransaction.sort((a, b) => {
        let typeA = a.transaction_type;
        let typeB = b.transaction_type;
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return 0;
      });
    }
    {
      renderTransactions();
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-10'>
          <h3 className='text-center mb-4'>Transaksi</h3>
          <hr />
          <div className='row mb-3'>
            <div className='col-8 d-flex justify-content-start'>
              <Input
                placeholder='Cari nama pelanggan'
                className='text-left w-50'
                onChange={onChangeSearch}
              />
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                style={{
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <DropdownToggle
                  caret
                  style={{
                    backgroundColor: 'grey',
                    border: '1px solid #714a4a',
                    width: '100%',
                    paddingTop: 7,
                    paddingBottom: 5,
                    paddingRight: 30,
                    paddingLeft: 30,
                    color: 'white',
                    letterSpacing: 2,
                  }}
                >
                  Sorting
                </DropdownToggle>
                <DropdownMenu className='shadow'>
                  <DropdownItem
                    onClick={() => sortTrx('Pesanan', 'ASC')}
                    className='border-bottom'
                  >
                    Status Pesanan
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => sortTrx('Type', 'ASC')}
                    className='border-bottom'
                  >
                    Type Pesanan
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Table hover bordered>
            <thead>
              <tr className='text-center'>
                <th>No</th>
                <th className='w-25'>No Pesanan</th>
                <th>Pelanggan</th>
                <th>Tgl. Pesan</th>
                <th>Status Pesanan</th>
                <th>Type Pesanan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransaksi;
