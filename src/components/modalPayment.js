import React from 'react';
import { useDispatch } from 'react-redux';
import { payment } from '../redux/actions';
import { payment_confirmation } from '../assets';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';


const ModalPayment = (props) => {
    const dispatch = useDispatch()

    return ( 
        <Modal isOpen={props.modal} toggle={props.toggleModal} style={{ marginTop: '15vw' }}>
            <ModalHeader toggle={props.toggleModal}>Lakukan Konfirmasi Pembayaran</ModalHeader>
            <ModalBody className='d-flex'>
                <img src={payment_confirmation} alt='payment' width='50%' style={{ flex: 1 }} />
                <div style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                    <Button color="success" onClick={() => { dispatch(payment(props.idpayment)); props.paymentSuccess() }} block style={{ marginTop: '4vw' }}>Konfirmasi Pembayaran</Button>{' '}
                    <Link to='order-list' style={{ textDecoration: 'none' }}>
                        <Button disabled block outline style={{ marginTop: '1vw' }}>Lihat Daftar Belanja</Button>
                    </Link>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default ModalPayment;