import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Container, DropdownItem, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import { addTransaction, deleteCart, getCart, getCustomProducts, getDefaultAddress, payment, updateQty } from '../redux/actions';
import { payment_confirmation } from '../assets';
import Swal from 'sweetalert2';

const CartPage = (props) => {
    const dispatch = useDispatch()

    // cart umum
    const [tempCart, setTempCart] = useState([]);
    const [inputList, setInputList] = useState([]);

    // cart resep
    const [qty1, setQty1] = useState(0);
    const [value, setValue] = useState(''); //coba-coba

    // modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [redirect, setRedirect] = useState(false);

    const { iduser, cartUser, customProducts, defaultAddress, idpayment } = useSelector(state => {
        return {
            iduser: state.usersReducer.iduser,
            cartUser: state.CartReducer.cartUser,
            customProducts: state.ProductsReducer.customProducts,
            defaultAddress: state.usersReducer.defaultAddress[0],
            idpayment: state.transactionsReducer.idpayment
        }
    })

    useEffect(() => {
        dispatch(getCustomProducts())
        // dispatch(getDefaultAddress(iduser))
        // dispatch(getCart(iduser))
        setTempCart(cartUser)
        console.log('cek tempcart: ', tempCart)
    }, [])



    // -----------------------------------------

    // KERANJANG UMUM

    // Render card
    const renderCart = (iduser) => {
        if (cartUser.length > 0) {
            console.log('cek default address: ', defaultAddress)
            return cartUser.map((item, index) => {
                return (
                    <>
                        <Link to={`/product-detail?idproduct=${item.idproduct}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="card-tranparent d-flex"  >
                                <div style={{ flex: 1 }}>
                                    <img src={item.product_image} width='90%' />
                                </div>
                                <div style={{ flex: 4, marginTop: 30 }}>
                                    <p >{item.name}</p>
                                    <p style={{ fontWeight: 'bold' }}>Rp.{item.price_pcs.toLocaleString()}</p>
                                </div>
                            </div>
                        </Link>
                        <div className='d-flex'>
                            <div style={{ flex: 5 }}>
                                <p style={{ marginLeft: 10, color: '#2ecc71', fontWeight: '400' }}  >Add Notes for this item</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <i className='large material-icons right-menu_icon'
                                    id='trashbinImage'
                                    style={{ fontSize: 30, marginTop: -8, cursor: 'pointer' }}
                                    onClick={() => { dispatch(deleteCart(item.idcart)); dispatch(getCart(iduser)) }}
                                >
                                    delete
                                </i>
                            </div>
                            <div style={{ flex: 3, marginTop: -20 }}>
                                <Button color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center' }} onClick={() => { btQty("dec", item.qty, item.idcart); dispatch(getCart(item.iduser)) }}><p style={{ marginLeft: -3, marginTop: -14, fontWeight: 'bolder', fontSize: 25 }}>-</p></Button>
                                <Button color='success' disabled outline style={{ marginTop: 15, borderRadius: 15, width: 60, height: 30, letterSpacing: 2, textAlign: 'center', marginLeft: 5, marginRight: 5 }}><p style={{ marginTop: -5, fontWeight: 'bolder', fontSize: 16, color: 'black' }}>{item.qty}</p></Button>
                                <Button color='warning' style={{ marginTop: 15, borderRadius: 15, width: 30, height: 30, letterSpacing: 2, textAlign: 'center', marginRight: 10 }} onClick={() => { btQty("inc", item.qty, item.idcart); dispatch(getCart(item.iduser)) }}><p style={{ marginLeft: -7, marginTop: -14, fontWeight: 'bolder', fontSize: 25 }}>+</p></Button>
                            </div>

                        </div>
                        <DropdownItem divider style={{ marginLeft: 7, marginRight: 7 }} />
                    </>
                )
            })
        }
    }
    // Empty Cart Condition
    const isCartEmpty = () => {
        if (cartUser.length > 0) {
            return <>
                <CardBody style={{ overflowY: 'auto', maxHeight: '50vh' }}>
                    {renderCart(iduser)}
                </CardBody>
                <DropdownItem divider />
                <CardBody style={{ fontWeight: 'bold' }}>
                    <CardText><span >Subtotal</span><span style={{ float: 'right' }}>Rp{totalPrice1().toLocaleString()}</span></CardText>
                </CardBody>
            </>
        } else {
            return <>
                <CardBody style={{ textAlign: 'center' }}>
                    <h5>Keranjangmu Kosong nih</h5>
                    <Link to='/products?idcategory=1' style={{ textDecoration: 'none' }}>
                        <Button color='success' outline block >Mulai Belanja</Button>
                    </Link>
                </CardBody>
            </>
        }
    }
    // Qty modification function
    const btQty = (type, qty, idcart) => {
        if (type === 'inc') {
            console.log("saya increment", qty, idcart)
            dispatch(updateQty(qty, "inc", idcart))
        } else if (type == 'dec') {
            console.log("saya decrement")
            dispatch(updateQty(qty, "dec", idcart))
        }
    }
    // Total Price1 Function
    const totalPrice1 = () => {
        let totalPrice = 0
        cartUser.forEach(e => {
            totalPrice += (e.price_pcs * e.qty)
        })
        return totalPrice
    }
    //tooltip
    const toolTipBin = () => {
        if (cartUser.length > 0) {
            return (
                <UncontrolledTooltip placement="top" target="trashbinImage">
                    Delete item(s)
                </UncontrolledTooltip>
            )
        }
    }

    // -----------------------------------------

    // KERANJANG CUSTOM ORDER

    // Titlecase Function
    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    // 
    // Render Dropdown Product
    const renderCustomProduct = () => {
        if (customProducts) {
            return customProducts.map((item, index) => {
                return <option key={index} value={item.name}>{toTitleCase(item.name)} ({item.satuan})</option>
            })
        }
    }

    const renderInputResep = (id) => {   //setstate dibuat objek sajakah?
        console.log(value)
        return <div className='d-flex my-2'>
            <Input type='select' name={`select${id}`} id={`bahan${id}`} onChange={e => setValue(e.currentTarget.value)} style={{ flex: 8, marginRight: 20, letterSpacing: 1.5 }} >
                <option > - Pilih Bahan - </option>
                {renderCustomProduct()}
            </Input>
            <Input type='text' placeholder='-qty-' innerRef={e => setQty1(e)} style={{ flex: 1, textAlign: 'center', letterSpacing: 1.5 }} />
            {/* <p style={{ flex: 1, marginLeft: 10 }}>{renderSatuanList()}</p> */}
        </div>
    }

    const renderListInput = (inputList) => {
        // console.log('cekinputlist', inputList.length)
        // console.log('cekinputlist', inputList)
        return inputList.map(e => {
            return renderInputResep(parseInt(e))
        })
    }

    // let satuanList = []
    // const renderSatuanList = () => {
    //     customProducts.forEach(e => {
    //         let satuan = []
    //         satuan.push(e.name)
    //         satuan.push(e.satuan)
    //         satuanList.push(satuan)
    //     })
    //     console.log('ceksatuanlist: ', satuanList)
    // }

    // -----------------------------------------

    // INFORMASI PEMBAYARAN & PENGIRIMAN
    // render alamat pengiriman
    const renderAlamat = () => {
        if (defaultAddress) {
            return <><CardTitle><h6>Alamat Pengiriman</h6></CardTitle>
                <DropdownItem divider />
                <CardTitle style={{ fontWeight: 'bold' }}>{defaultAddress.name}</CardTitle>
                <CardText>{defaultAddress.handphone}</CardText>
                <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -10 }}>{defaultAddress.alamat_detail}</CardText>
                <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -15 }}>{defaultAddress.kecamatan} - {defaultAddress.kota}</CardText>
                <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -15 }}>{defaultAddress.provinsi} - {defaultAddress.kode_pos}</CardText>
                <DropdownItem style={{ marginBottom: 20 }} divider />
                <>
                    <Button color='secondary' outline>Pilih Alamat Lain</Button>
                    <Button color='secondary' outline style={{ float: 'right' }}>+ Tambah Alamat</Button>
                </></>
        }
    }


    // -----------------------------------------

    // CHECKOUT
    const totalHarga = () => {
        let totalHarga = totalPrice1() + 0
        return totalHarga
    }
    const totalOngkir = () => {
        return 10000
    }
    const checkOut = () => {
        let checkOut = []
        let obj = {}
        let idCart = []
        let ongkir = totalOngkir()
        let total_payment = (totalOngkir() + totalHarga())


        cartUser.forEach((item, index) => {
            obj["idproduct"] = item.idproduct
            obj["iduser"] = item.iduser
            obj["note"] = item.note
            obj["qty"] = item.qty
            obj["total_price"] = item.qty * item.price_pcs
            checkOut.push(obj)
            // checkOut.push(item)
            idCart.push(item.idcart)
            obj = {}
        })

        console.log("cek bawaan button checkout: ", checkOut, idCart, ongkir, total_payment, defaultAddress.iduser_address)
        dispatch(addTransaction(checkOut, idCart, ongkir, total_payment, defaultAddress.iduser_address))
        // dispatch(getTransaction(iduser))
    }
    const paymentSuccess = () => {
        let timerInterval
        Swal.fire({
            title: 'Payment in Progress',
            html: 'I will close after payment confirmed.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
        setTimeout(() => Swal.fire({
            icon: 'success',
            title: 'Your Payment Has Been Confirmed',
            showConfirmButton: false,
            timer: 2000
        }), 3000)

        setTimeout(() => setRedirect(true), 5000)
    }

    if (redirect) {
        return <Redirect to='order-list' />
    }

    return (
        <Container className="d-flex">
            {/* KERANJANG */}
            <div style={{ flex: 2, marginTop: 20 }}>
                <h3 style={{ color: '#27ae60' }}>Keranjang (Umum)</h3>
                <Card>
                    {isCartEmpty()}
                </Card>

                <h3 style={{ marginTop: 35, color: '#e74c3c' }}>Keranjang (dengan Resep Dokter)</h3>
                <Card style={{ marginBottom: 100 }}>
                    <CardBody style={{ overflowY: 'auto', maxHeight: '50vh', letterSpacing: 1.5 }}>
                        <FormGroup>
                            <h6 style={{ display: 'flex' }}><span style={{ flex: 2 }}>Bahan Resep :</span><span style={{ float: 'right' }}>Dosis : x<input type='text' style={{ width: 50, textAlign: 'center' }} /> </span></h6>
                            {renderListInput(inputList)}
                            {/* {renderInputResep()} */}
                        </FormGroup>
                        <Button block outline color='secondary' onClick={() => { setInputList(arr => [...arr, `${arr.length + 1}`]); console.log(qty1) }}>+ Bahan Resep</Button>
                    </CardBody>
                    <DropdownItem divider />
                    <CardBody style={{ fontWeight: 'bold' }}>
                        <CardText><span >Subtotal</span><span style={{ float: 'right' }}>Rp 0</span></CardText>
                    </CardBody>
                </Card>
            </div>

            {/* INFORMASI CHECKOUT */}
            <div style={{ flex: 1, marginTop: 20, marginLeft: 30 }}>
                <Card>
                    <CardBody>
                        <CardTitle><h5>Ringkasan Pembayaran</h5></CardTitle>
                        <CardText><span>Total Harga</span><span style={{ float: 'right' }}>Rp{totalHarga().toLocaleString()}</span></CardText>
                        <CardText><span>Ongkos Kirim</span><span style={{ float: 'right' }}>{totalOngkir().toLocaleString()}</span></CardText>
                        <DropdownItem divider />
                        <CardText style={{ fontSize: 20, fontWeight: '500' }}><span>Total Tagihan</span><span style={{ float: 'right' }}>Rp{(totalHarga() + totalOngkir()).toLocaleString()}</span></CardText>
                    </CardBody>
                </Card>
                <CardBody style={{ marginTop: 30 }}>
                    {renderAlamat()}
                </CardBody>
                <CardBody style={{ marginTop: 30 }}>
                    <CardTitle><h6>Metode Pembayaran</h6></CardTitle>
                    <DropdownItem divider />
                    <>
                        <img src='https://media.hitekno.com/thumbs/2019/03/21/96220-logo-go-pay/350x230-img-96220-logo-go-pay.jpg' width='25%' style={{ marginTop: -5 }} />
                        <Button color='success' outline style={{ float: 'right' }}>Pilih Metode</Button>
                    </>
                </CardBody>
                <Button color='danger' block style={{ marginTop: 20 }} onClick={() => { checkOut(); toggleModal() }}>
                    {/* <Button color='danger' block style={{ marginTop: 20 }} onClick={() => toggleModal()}> */}
                    <i className='material-icons' style={{ fontSize: 25, color: 'white', position: 'relative', top: 5, right: 25 }}>verified_user</i>
                    Konfirmasi Pesanan
                </Button>
            </div>

            {toolTipBin()}

            <Modal isOpen={modal} toggle={toggleModal} style={{ marginTop: '15vw' }}>
                <ModalHeader toggle={toggleModal}>Lakukan Konfirmasi Pembayaran</ModalHeader>
                <ModalBody className='d-flex'>
                    <img src={payment_confirmation} alt='payment' width='50%' style={{ flex: 1 }} />
                    <div style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                        {/* <Button color="success" onClick={paymentSuccess} block style={{ marginTop: '4vw' }}>Konfirmasi Pembayaran</Button>{' '} */}
                        <Button color="success" onClick={() => { dispatch(payment(idpayment)); paymentSuccess() }} block style={{ marginTop: '4vw' }}>Konfirmasi Pembayaran</Button>{' '}
                        <Link to='order-list' style={{ textDecoration: 'none' }}>
                            <Button block outline style={{ marginTop: '1vw' }}>Lihat Daftar Belanja</Button>
                        </Link>
                    </div>
                </ModalBody>
            </Modal>
        </Container>
    )
}

export default CartPage;