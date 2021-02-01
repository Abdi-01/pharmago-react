import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Container, DropdownItem } from 'reactstrap';
import { getDefaultAddress, getDetailTransaction, payment } from '../redux/actions';
import { not_pay_yet, paid } from '../assets'
import Moment from 'moment';
import { API_URL } from '../support/urlApi';
import ModalPayment from '../components/modalPayment';
import Swal from 'sweetalert2';


const TransactionDetail = (props) => {
    Moment.locale('id')
    console.log(props.location.search) //?idtransaction=1

    // modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailTransaction(props.location.search))
        dispatch(getDefaultAddress())

    }, [])

    const { iduser, detailTransaction, defaultAddress } = useSelector(state => {
        return {
            detailTransaction: state.transactionsReducer.detailTransaction,
            iduser: state.usersReducer.iduser,
            defaultAddress: state.usersReducer.defaultAddress[0]
        }
    })

    const countProduct = () => {
        let count = 0
        detailTransaction[0].products.forEach(e => {
            count += 1
        })
        return count
    }



    const renderProductDetail = () => {
        return detailTransaction[0].products.map((item, index) => {
            return (
                <div className='d-flex' key={index} style={{ fontSize: 13, marginRight: 25 }}>
                    <div style={{ flex: 1, marginLeft: 5 }}>
                        {
                            item.product_image === null ?
                                <img width='40%' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kDX11rAgv8YY1KYqyauOMcASpPp6w-_52Q&usqp=CAU'} />
                                :
                                <img width='40%' src={API_URL + item.product_image} />
                        }
                    </div>
                    <div style={{ flex: 3 }}>
                        <p>{item.name}</p>
                        <p style={{ color: 'grey', marginTop: -20 }}>
                            x {item.qty_co === null ? item.qty_qo : item.qty_co} {item.qty_co !== null ? item.name !== 'BIOSYAFA G10' ? item.name !== 'BIOZIME' ? 'mg' : 'ml' : 'ml' : 'kemasan'}
                        </p>
                    </div>
                    <div style={{ flex: 1, fontWeight: 'bold', textAlign: 'right', fontSize: 13 }}>
                        <p>Rp {parseInt(item.total_price).toLocaleString()}</p>
                    </div>
                </div>
            )
        })
    }

    const renderAlamat = () => {
        if (defaultAddress) {
            return <>
                <CardTitle><h6>Alamat Pengiriman</h6></CardTitle>
                <CardText style={{ fontSize: 13, color: 'darkgrey' }}>{defaultAddress.alamat_detail}</CardText>
                <CardText style={{ fontSize: 13, color: 'darkgrey', marginTop: -15 }}>{defaultAddress.kecamatan} - {defaultAddress.kota}</CardText>
                <CardText style={{ fontSize: 13, color: 'darkgrey', marginTop: -15 }}>{defaultAddress.provinsi} - {defaultAddress.kode_pos}</CardText>
            </>
        }
    }

    const renderTransactionDetail = () => {
        return <Card>
            <CardBody >
                <div style={{ textAlign: 'center' }}>
                    {
                        detailTransaction[0].payment_status == 'unpaid' ?
                            <>
                                <img width="20%" src={not_pay_yet} alt={detailTransaction[0].payment_status} style={{ marginBottom: 25 }} />
                                <CardTitle style={{ color: 'red' }} >PESANAN BELUM DIBAYAR</CardTitle>
                            </>
                            :
                            <>
                                <img width="20%" src={paid} alt={detailTransaction[0].payment_status} />
                                <CardTitle style={{ color: 'darkgreen' }}>PESANAN SUDAH DIBAYAR</CardTitle>
                                <p style={{ fontSize: 13 }}>INVOICE NUMBER : {detailTransaction[0].invoice_number}</p>

                            </>
                    }
                </div>
                <DropdownItem divider style={{ marginTop: 20, marginBottom: 20 }} />
                <div className='d-flex'>
                    <div style={{ flex: 1 }}>
                        <h6>
                            {
                                detailTransaction[0].transaction_type === 'CO' ?
                                    "Pesanan Obat Resep"
                                    : detailTransaction[0].transaction_type === 'QO' ?
                                        "Pesanan Obat"
                                        :
                                        "Pesanan Obat Umum & Resep"
                            }
                        </h6>

                        {/* <p style={{ fontSize: 13 }}>{detailTransaction[0].invoice_number}</p> */}
                        <p style={{ fontSize: 13, color: 'grey' }}>{Moment(detailTransaction[0].created_at).zone('+1400').format('ll')}, {Moment(detailTransaction[0].created_at).zone('+1400').format('LT')} WIB</p>
                        {/* <p style={{ fontSize: 12, color: 'grey', marginTop: -18 }}>{countProduct()} produk, Rp {parseInt(detailTransaction[0].total_payment).toLocaleString()}</p> */}
                        <p style={{ fontSize: 12, color: 'grey', marginTop: -18 }}>{countProduct()} produk</p>
                        <p>Daftar Pesanan</p>
                        {renderProductDetail()}
                        {
                            detailTransaction[0].transaction_type === 'CO' ?
                                <>
                                    <p>Catatan apotek</p>
                                    <p>3x1</p>
                                </>
                                :
                                detailTransaction[0].transaction_type === 'ALL' ?
                                    <>
                                        <p>Catatan apotek</p>
                                        <p>3x1</p>
                                    </>
                                    :
                                    null
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <h6>Ringkasan Pembayaran</h6>
                        <div className='d-flex' style={{ fontSize: 13 }}>
                            <div style={{ flex: 1 }}>
                                <p>Subtotal</p>
                                <p>Ongkos Kirim</p>
                                <h6>Total</h6>
                            </div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                                <p>Rp {parseInt(detailTransaction[0].total_payment - detailTransaction[0].ongkir).toLocaleString()}</p>
                                <p>Rp {parseInt(detailTransaction[0].ongkir).toLocaleString()}</p>
                                <h6>Rp {parseInt(detailTransaction[0].total_payment).toLocaleString()}</h6>
                            </div>
                        </div>
                        <DropdownItem divider />
                        {
                            detailTransaction[0].payment_status == 'paid' &&

                            <div className='d-flex'>
                                <p style={{ flex: 1 }}>metode pembayaran</p>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <img src='https://media.hitekno.com/thumbs/2019/03/21/96220-logo-go-pay/350x230-img-96220-logo-go-pay.jpg' width='25%' style={{ textAlign: 'right', marginTop: -5 }} />
                                </div>
                            </div>
                        }
                        <div>
                            {renderAlamat()}
                        </div>

                    </div>
                </div>
            </CardBody>
            {
                detailTransaction[0].payment_status == 'unpaid' &&
                <Button block color='success'
                    style={{ marginTop: 20, marginBottom: 20, marginLeft: '5%', width: '90%', justifyContent: 'center' }}
                    onClick={toggleModal}
                >
                    <i className='material-icons' style={{ fontSize: 25, color: 'white', position: 'relative', top: 5, right: 10 }}>verified_user</i>
                    Lakukan Pembayaran Menggunakan Go-Pay
                    </Button>
            }
        </Card>
    }

    const paymentSuccess = () => {
        let timerInterval;
        Swal.fire({
            title: 'Payment in Progress',
            html: 'I will close after payment confirmed.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                    const content = Swal.getContent();
                    if (content) {
                        const b = content.querySelector('b');
                        if (b) {
                            b.textContent = Swal.getTimerLeft();
                        }
                    }
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        });
        setTimeout(
            () =>
                Swal.fire({
                    icon: 'success',
                    title: 'Your Payment Has Been Confirmed',
                    showConfirmButton: false,
                    timer: 2000,
                }),
            3000
        );

        setTimeout(() => window.location.reload(false), 5000);
    };

    return (
        <Container>
            <h6 style={{ marginBottom: 20, marginTop: 20 }}>DETAIL TRANSAKSI</h6>
            {
                detailTransaction.length > 0 && renderTransactionDetail()
            }
            {
                detailTransaction.length > 0 &&
                <ModalPayment
                    modal={modal}
                    toggleModal={toggleModal}
                    idpayment={detailTransaction[0].idtransaction}
                    paymentSuccess={paymentSuccess}
                />
            }

        </Container>
    )
}

export default TransactionDetail;