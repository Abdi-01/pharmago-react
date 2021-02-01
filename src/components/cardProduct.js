import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
} from 'reactstrap';
import { API_URL } from '../support/urlApi';
import ModalCart from './modalCart';
import ModalPayment from './modalPayment';

const CardProduct = ({ children }) => {
  // modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);


  return (
    <Col sm={6} md={3} style={{justifyContent: 'left' }}>
    {/* <Col sm={6} md={3} style={{ margin: 'auto', justifyContent: 'center' }}> */}
      <Card className='shadow-sm mx-1 my-2' style={{
        textAlign: 'center', letterSpacing: 1.5, display: 'inline-flex', flexWrap: 'nowrap', borderRadius: 10, width: '100%', overflow: 'hidden', height: '95%'
      }}      >
        <Link to={`/product-detail?idproduct=${children.idproduct}`} style={{ textDecoration: 'none' }}   >
          <CardImg top width='100%' src={API_URL + children.product_image} alt={children.name} />
        </Link>
        <CardBody>
          <CardTitle tag='h6' style={{ color: 'black' }}>
            {children.name}
          </CardTitle>
          <CardSubtitle
            className='text-muted'
            style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}
          >
            Per {children.satuan}
          </CardSubtitle>
          <CardText style={{ color: 'black', fontWeight: 'bold' }}>
            Rp{children.price_pcs.toLocaleString()},-
            </CardText>
          <Button
            color='success'
            className='btn-block'
            outline
            style={{ borderRadius: 20, letterSpacing: 2 }}
            onClick={() => toggleModal()}
          >
            Beli
            </Button>
        </CardBody>
      </Card>
      <ModalPayment />
      <ModalCart
        modal={modal}
        toggleModal={toggleModal}
        qty={1}
        data={children}
      />
    </Col>

  );
};

export default CardProduct;
