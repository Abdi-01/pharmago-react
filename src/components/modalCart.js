import { Modal } from 'bootstrap';
import React from 'react';
import { ModalBody, ModalHeader } from 'reactstrap';

const ModalCart = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal} style={{ marginTop: '15vw' }}>
            <ModalHeader toggle={props.toggleModal}>Pembelian Langsung</ModalHeader>
            <ModalBody>test</ModalBody>
        </Modal>
    )
}

export default ModalCart;