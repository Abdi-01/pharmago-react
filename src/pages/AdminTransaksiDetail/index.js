import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { NavbarAdmin } from '../../components';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { getAllDetailTransaction } from '../../redux/actions';

const AdminTransaksiDetail = (props) => {
  const history = useHistory();
  const { allDetailTransaction, allTransaction } = useSelector(
    ({ usersReducer, transactionsReducer }) => {
      return {
        name: usersReducer.name,
        allDetailTransaction: transactionsReducer.allDetailTransaction,
        allTransaction: transactionsReducer.allTransaction,
      };
    }
  );

  const { index, idTrx } = props.location.state;
  // console.log('check id', idTrx);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDetailTransaction(idTrx));
  }, []);

  // console.log('check detail', allDetailTransaction);
  // render product lists
  const renderTrxDetail = () => {
    return allTransaction.map((item, idx) => {
      if (index === idx) {
        console.log('item', item);
        return (
          <>
            <div className='row'>
              <div className='col-4'>
                <Card>
                  <CardHeader>Detail Pesanan</CardHeader>
                  <CardBody>
                    <Table>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            note
                          </i>
                        </td>
                        <td className='d-flex self-align-item '>
                          {item.invoice_number}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            date_range
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>
                          {moment(item.created_at).format('LLL')}
                        </td>
                      </tr>
                      <tr className='border-bottom'>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            note_add
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>
                          {item.transaction_type === 'CO' ||
                          item.transaction_type === 'ALL'
                            ? 'CUSTOM ORDER'
                            : 'Regular Order'}
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
              </div>
              <div className='col-4'>
                <Card>
                  <CardHeader>Detail Pelanggan</CardHeader>
                  <CardBody>
                    <Table>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            account_circle
                          </i>
                        </td>
                        <td className='d-flex self-align-item '>
                          {item.customer}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            email
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>{item.email}</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            phone_iphone
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>
                          {item.handphone}
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
              </div>
              <div className='col-4'>
                <Card>
                  <CardHeader>Detail Pembayaran</CardHeader>
                  <CardBody>
                    <Table>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center '>
                            credit_card
                          </i>
                        </td>
                        <td className='d-flex self-align-item '>
                          Bank Transfer
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            sync
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>
                          {item.payment_status}
                        </td>
                      </tr>
                      <tr className='border-bottom'>
                        <td style={{ width: '5%' }}>
                          <i className='large material-icons d-flex self-align-center'>
                            note_add
                          </i>
                        </td>
                        <td className='d-flex self-align-item'>
                          {item.notes === null ? '-' : 'Obat Racik'}
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <hr />
                <Card>
                  <CardHeader>Pesanan</CardHeader>
                  <CardBody>
                    <Table className='table table-bordered mb-5'>
                      <thead>
                        <tr>
                          <th style={{ width: '80%' }}>Alamat Pengiriman</th>
                          <td>Keterangan</td>
                        </tr>
                        <tr className='border-bottom'>
                          <td style={{ width: '80%' }}>
                            <p>{item.alamat_detail}</p>
                            <p>
                              {item.kecamatan}, {item.kota} - {item.provinsi}
                            </p>
                          </td>
                          <td>{item.notes === null ? '-' : item.notes}</td>
                        </tr>
                      </thead>
                    </Table>

                    <Table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th className='w-50'>Produk</th>
                          <th className='text-center'>Type Produk</th>
                          <th className='text-center'>Qty (Obat Racik)</th>
                          <th className='text-center'>Qty (Obat Umum)</th>
                          <th className='text-center'>Harga Per Item</th>
                          <th className='text-center'>Total</th>
                        </tr>
                      </thead>
                      {allDetailTransaction.map((trx, i) => (
                        <thead>
                          <tr className='border-bottom'>
                            <td>{trx.name}</td>
                            <td className='text-capitalize text-center'>
                              {trx.type_obat}
                            </td>
                            <td className='text-center'>
                              {trx.qty_co === null ? 0 : trx.qty_co}
                            </td>
                            <td className='text-center'>
                              {trx.qty_qo === null ? 0 : trx.qty_qo}
                            </td>
                            <td>
                              Rp
                              {trx.price_pcs === null
                                ? 0
                                : trx.price_pcs.toLocaleString()}
                            </td>
                            <td>
                              Rp
                              {trx.total_price === null
                                ? 0
                                : trx.total_price.toLocaleString()}
                            </td>
                          </tr>
                        </thead>
                      ))}
                      <tfoot>
                        <tr className='border-bottom'>
                          <td colSpan='4'></td>
                          <th className='text-danger'>Ongkos Kirim</th>
                          <th className='text-danger'>
                            - Rp
                            {item.ongkir === null
                              ? '-'
                              : item.ongkir.toLocaleString()}
                          </th>
                        </tr>
                        <tr className='border-bottom'>
                          <td colSpan='4'></td>
                          <th>Total Pembayaran</th>
                          <td>
                            Rp
                            {item.total_payment === null
                              ? 'Belum Bayar'
                              : item.total_payment}
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                  </CardBody>
                </Card>
                <hr />
              </div>
            </div>
          </>
        );
      }
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-10'>
          <div className='row'>
            <div className='col-6'>
              <h3 className='text-left '>Pesanan</h3>
            </div>
            <div className='col-6 d-flex justify-content-end'>
              <Button
                color='danger'
                size='sm mb-3'
                onClick={() => history.push('/admin-transaksi')}
              >
                Kembali
              </Button>
            </div>
          </div>
          <hr />

          {renderTrxDetail()}
        </div>
      </div>
    </div>
  );
};

export default AdminTransaksiDetail;
