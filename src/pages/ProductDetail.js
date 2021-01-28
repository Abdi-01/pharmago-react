import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Alert, Button, Card, CardBody, CardImg, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import { addToCart, getCart, getDetail, getProducts, keepLogin } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ProductDetail = (props) => {
    console.log(props.location.search) //?idproduct=1

    const dispatch = useDispatch()
    const [qtyCart, setQtyCart] = useState(1);
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    // const { buttonLabel, className } = props;
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    // const [productDetail, setProductDetail] = useState([])


    useEffect(() => {
        dispatch(getDetail(props.location.search))
        dispatch(keepLogin())
    }, [])

    const { iduser, detailProduct, role } = useSelector(state => {
        return {
            detailProduct: state.ProductsReducer.detailProduct,
            iduser: state.usersReducer.iduser,
            role: state.usersReducer.role
        }
    })


    // Tab Function
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // Quantity to Cart Function
    const btQtyCart = (value) => {
        if (value === '+') {
            if (qtyCart < detailProduct[0].stock_pcs) {
                setQtyCart(qtyCart + 1)
            } else if (qtyCart === detailProduct[0].stock_pcs) {
                setVisible(true)
            }
        } else if (value === '-') {
            if (qtyCart > 1) {
                setQtyCart(qtyCart - 1)
                setVisible(false)
            }
        }
    }

    // Add to Cart & Beli Langsung Function
    // const btAddCart = (iduser, idproduct, qty, price, role) => {
    const btAddCart = (iduser, idproduct, qty, price) => {
        // if (role === 'user') {
            let total_harga = qty * price
            dispatch(addToCart({ iduser, idproduct, qty, total_harga }))
            toggleModal()
        // } else if (role === 'admin') {
        //     alert(`sorry, you are ${role}, please login with User Account`)
        // }

    }

    const btBeli = (qty) => {
        alert(`jumlah beli langsung:  ${qty}`)

    }


    // Render Detail Product dengan Kondisi
    const renderDetail = () => {
        if (detailProduct.length > 0) {
            console.log('detailProduct: ', detailProduct)
            return (
                <Container>
                    <div className='ml-3 my-3'>
                        <h3>{detailProduct[0].name}</h3>
                        <p>Rp. {detailProduct[0].price_pcs.toLocaleString()},- / {detailProduct[0].satuan}</p>
                    </div>
                    <Row>
                        <Col md={6} >
                            <div className="card-tranparent">
                                <CardBody style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Card className='shadow' style={{ borderRadius: 20, overflow: 'auto' }}>
                                        <CardImg top width='100%' src={detailProduct[0].product_image} />
                                    </Card>
                                    <div className="card-tranparent" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <Button disabled={qtyCart === 1} color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center' }} onClick={() => btQtyCart('-')}><p style={{ marginLeft: -3, marginTop: -14, fontWeight: 'bolder', fontSize: 25 }}>-</p></Button>
                                        <Button color='success' disabled outline style={{ marginTop: 15, borderRadius: 15, width: 60, height: 30, letterSpacing: 2, textAlign: 'center', marginLeft: 5, marginRight: 5 }}><p style={{ marginTop: -5, fontWeight: 'bolder', fontSize: 16, color: 'black' }}>{qtyCart}</p></Button>
                                        <Button color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center', marginRight: 10 }} onClick={() => btQtyCart('+')}><p style={{ marginLeft: -7, marginTop: -14, fontWeight: 'bolder', fontSize: 25 }}>+</p></Button>
                                        {/* Button CART & BELI */}
                                        <img id='cartImage' onClick={() => {btAddCart(iduser, detailProduct[0].idproduct, qtyCart, detailProduct[0].price_pcs); console.log('clicked cart')}} style={{ marginLeft: 15, marginBottom: -10, cursor: 'pointer' }} width='10%' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzEwNzsiIGQ9Ik0zOTQuNjY3LDI1NkMzMTguMTIyLDI1NS45MDYsMjU2LjA5NCwxOTMuODc4LDI1NiwxMTcuMzMzYzAtMy42MDUsMC4yNzctNy4xMjUsMC41MzMtMTAuNjY3SDk2DQoJYy01Ljg5MSwwLjAwNS0xMC42NjIsNC43ODUtMTAuNjU3LDEwLjY3N2MwLjAwMSwwLjY1NSwwLjA2MiwxLjMwOSwwLjE4MiwxLjk1M2wzMiwxNzAuNjY3YzAuOTQ0LDUuMDQzLDUuMzQ0LDguNjk5LDEwLjQ3NSw4LjcwNA0KCWgyOTIuOTkyYzI2LjksMC4wMDMsNDkuNTkyLTIwLjAyNyw1Mi45MjgtNDYuNzJsMi45MDEtMjMuMTY4QzQ1My4wNzIsMjQ2LjQ0Myw0MjQuMjY1LDI1NS45ODgsMzk0LjY2NywyNTZ6Ii8+DQo8Zz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0NTVBNjQ7IiBjeD0iMzk0LjY2NyIgY3k9IjQ1OC42NjciIHI9IjUzLjMzMyIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzQ1NUE2NDsiIGN4PSIxODEuMzMzIiBjeT0iNDU4LjY2NyIgcj0iNTMuMzMzIi8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzQ1NUE2NDsiIGQ9Ik00MzcuMzMzLDM4NEgxOTEuMTI1Yy0zNS41NjEtMC4wNzQtNjYuMTYzLTI1LjE1Ni03My4yMTYtNjAuMDExTDY1LjkyLDY0SDEwLjY2Nw0KCQlDNC43NzYsNjQsMCw1OS4yMjQsMCw1My4zMzNzNC43NzYtMTAuNjY3LDEwLjY2Ny0xMC42NjdoNjRjNS4wNy0wLjAwMSw5LjQzOSwzLjU2NiwxMC40NTMsOC41MzNsNTMuNzE3LDI2OC41ODcNCgkJYzUuMDM1LDI0Ljg5NiwyNi44ODgsNDIuODE3LDUyLjI4OCw0Mi44OGgyNDYuMjA4YzUuODkxLDAsMTAuNjY3LDQuNzc2LDEwLjY2NywxMC42NjdTNDQzLjIyNCwzODQsNDM3LjMzMywzODR6Ii8+DQo8L2c+DQo8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0Q0FGNTA7IiBjeD0iMzk0LjY2NyIgY3k9IjExNy4zMzMiIHI9IjExNy4zMzMiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGQUZBRkE7IiBkPSJNNDM3LjMzMywxMjhIMzUyYy01Ljg5MSwwLTEwLjY2Ny00Ljc3Ni0xMC42NjctMTAuNjY3czQuNzc2LTEwLjY2NywxMC42NjctMTAuNjY3aDg1LjMzMw0KCQljNS44OTEsMCwxMC42NjcsNC43NzYsMTAuNjY3LDEwLjY2N1M0NDMuMjI0LDEyOCw0MzcuMzMzLDEyOHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkFGQUZBOyIgZD0iTTM5NC42NjcsMTcwLjY2N2MtNS44OTEsMC0xMC42NjctNC43NzYtMTAuNjY3LTEwLjY2N1Y3NC42NjdDMzg0LDY4Ljc3NiwzODguNzc2LDY0LDM5NC42NjcsNjQNCgkJYzUuODkxLDAsMTAuNjY3LDQuNzc2LDEwLjY2NywxMC42NjdWMTYwQzQwNS4zMzMsMTY1Ljg5MSw0MDAuNTU4LDE3MC42NjcsMzk0LjY2NywxNzAuNjY3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
                                        <Button color='success' style={{ marginLeft: 15, marginTop: 15, borderRadius: 20, width: 250, letterSpacing: 2 }} onClick={() => btBeli(qtyCart)}>Beli</Button>
                                    </div>
                                    <Alert fade={true} isOpen={visible} toggle={onDismiss} color='danger' style={{ marginTop: 10, fontWeight: 'bold' }}>Sudah Mencapai Maksimal Jumlah Stock</Alert>
                                </CardBody>
                            </div>
                        </Col>
                        <Col md={6}>
                            <Nav tabs style={{ marginTop: 25 }}>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Deskripsi
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Informasi Obat
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} style={{ letterSpacing: 1.1 }}>
                                <TabPane tabId='1'>
                                    <Row>
                                        <Col sm={12}>
                                            <h6 style={{ marginTop: 15 }}>Indikasi Umum</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_umum}</p>

                                            <h6 style={{ marginTop: 15 }}>Deskripsi</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_indikasi}</p>

                                            <h6 style={{ marginTop: 15 }}>Kontra Indikasi</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_kontraindikasi}</p>

                                            <h6 style={{ marginTop: 15 }}>Efek Samping</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_efeksamping}</p>

                                            <h6 style={{ marginTop: 15 }}>Perhatian</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_perhatian}</p>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <Row>
                                        <Col sm={12}>
                                            <h6 style={{ marginTop: 15 }}>Komposisi</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_komposisi}</p>

                                            <h6 style={{ marginTop: 15 }}>Dosis</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_dosis}</p>

                                            <h6 style={{ marginTop: 15 }}>Aturan Pakai</h6>
                                            <p style={{ fontSize: 13, marginTop: -7, textAlign: 'justify', fontWeight: '100' }}>{detailProduct[0].desc_aturanpakai}</p>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                    <UncontrolledTooltip placement="bottom" target="cartImage">
                        Masukkan ke Keranjang
                </UncontrolledTooltip>
                    <Modal isOpen={modal} toggle={toggleModal} style={{ marginTop: '20vw' }}>
                        <ModalHeader toggle={toggleModal}>Berhasil Ditambahkan</ModalHeader>
                        <ModalBody>
                            <img src={detailProduct[0].product_image} alt='carted_image' width='20%' /><span style={{ marginRight: 15 }}>{detailProduct[0].name}</span>  x {qtyCart} Pcs
                            <Link to='/cart'>
                                <Button color="success" onClick={() => {toggleModal() ; dispatch(getCart(iduser))}} style={{ float: 'right' }}>Lihat Keranjang</Button>{' '}
                            </Link>
                        </ModalBody>
                    </Modal>
                </Container>
            )
        }
    }


    return (
        <div>
            { renderDetail()}
        </div>
    )
}

export default ProductDetail;