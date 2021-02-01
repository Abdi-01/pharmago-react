import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from '../support/urlApi';
import ModalPayment from './modalPayment';
import Swal from 'sweetalert2';
import { getDefaultAddress, quickBuy } from '../redux/actions';


const ModalCart = (props) => {
    const dispatch = useDispatch()

    const [qtyCart, setQtyCart] = useState(props.qty);
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    const [redirect, setRedirect] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
  
    useEffect(() => {
        dispatch(getDefaultAddress());
      }, []);
    
    const priceBarang = () => {
        let price = props.data.price_pcs * qtyCart
        return price
    }

    const { iduser, defaultAddress, idpayment} = useSelector((state) => {
        return {
            iduser: state.usersReducer.iduser,
            defaultAddress: state.usersReducer.defaultAddress[0],
            idpayment: state.transactionsReducer.idpayment
        };
    });

    const btQtyCart = (value) => {
        if (value === '+') {
            if (qtyCart < props.data.stock_pcs) {
                setQtyCart(qtyCart + 1);
            } else if (qtyCart === props.data.stock_pcs) {
                setVisible(true);
            }
        } else if (value === '-') {
            if (qtyCart > 1) {
                setQtyCart(qtyCart - 1);
                setVisible(false);
            }
        }
    };

    const totalOngkir = () => {
        return 10000;
      };
    
    const checkOut = () => {
        let transaction_type = 'QO';
        let ongkir = totalOngkir();

        let checkOut = { 'idproduct': props.data.idproduct, "iduser": iduser, "note": '', "qty_qo": qtyCart, "total_price": (props.data.price_pcs * qtyCart) }

        console.log("cek bawaan button checkout: ", checkOut, ongkir, defaultAddress.iduser_address, transaction_type)
        dispatch(quickBuy(checkOut, ongkir, defaultAddress.iduser_address, transaction_type))
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

        setTimeout(() => setRedirect(true), 5000);
    };

    if (redirect) {
        return <Redirect to='order-list' />;
    }
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal} style={{ marginTop: '15vw' }}>
            <ModalHeader toggle={props.toggleModal}>Lakukan Pembelian Cepat</ModalHeader>
            <ModalBody className='d-flex'>
                <img src={API_URL + props.data.product_image} alt={props.data.name} width='30%' style={{ flex: 1 }} />
                <div style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                    <h6>{props.data.name}</h6>
                    <p>Rp. {priceBarang().toLocaleString()}</p>

                    <Button disabled={qtyCart === 1} color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center', }} onClick={() => btQtyCart('-')}                    >
                        <p style={{ marginLeft: -3, marginTop: -14, fontWeight: 'bolder', fontSize: 25, }}> -  </p>
                    </Button>
                    <Button color='success' disabled outline style={{ marginTop: 15, borderRadius: 15, width: 60, height: 30, letterSpacing: 2, textAlign: 'center', marginLeft: 5, marginRight: 5, }}                    >
                        <p style={{ marginTop: -5, fontWeight: 'bolder', fontSize: 16, color: 'black', }}   >
                            {qtyCart}
                        </p>
                    </Button>
                    <Button color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center', marginRight: 10, }} onClick={() => btQtyCart('+')}                    >
                        <p style={{ marginLeft: -7, marginTop: -14, fontWeight: 'bolder', fontSize: 25, }}> + </p>
                    </Button>
                    {/* <Button color="success" onClick={() => { dispatch(payment(props.idpayment)); props.paymentSuccess() }} block style={{ marginTop: '4vw' }}>Konfirmasi Pembayaran</Button>{' '} */}
                    <Alert fade={true} isOpen={visible} toggle={() => onDismiss()} color='danger' style={{ marginTop: 10, fontWeight: 'bold' }}            >
                        Sudah Mencapai Maksimal Jumlah Stock
                </Alert>
                    <Button color="success" block style={{ marginTop: '4vw' }} onClick={()=> {checkOut(); toggleModal()}}>Konfirmasi Pesanan</Button>
                </div>
            </ModalBody>
            <ModalPayment
                modal={modal}
                toggleModal={toggleModal}
                idpayment={idpayment}
                paymentSuccess={paymentSuccess}
            />

        </Modal>

    )
}

export default ModalCart;