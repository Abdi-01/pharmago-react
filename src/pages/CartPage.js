import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  DropdownItem,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from 'reactstrap';
import {
  addCustomCart,
  addTransaction,
  deleteCart,
  getCart,
  getCustomProducts,
  getDefaultAddress,
  payment,
  getCustomCart,
  updateNote,
  updateQty,
  deleteCustomCart,
  keepLogin,
} from '../redux/actions';
import Swal from 'sweetalert2';
import CardCart from '../components/cardCart';
import ModalPayment from '../components/modalPayment';

const CartPage = (props) => {
  const dispatch = useDispatch();

  // cart resep function
  const [resepList, setResepList] = useState([]);
  const [qtyCapsule, setQtyCapsule] = useState(12); //tbcartCustom : qty_kapsul
  const [subtotal, setSubtotal] = useState(0); //tbcartCustom : total_harga

  // cart resep button
  const [confirmRecipe, setConfirmRecipe] = useState(false); // disable tombol konfirmasi
  const [disableInput, setDisableInput] = useState(false);

  // modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(keepLogin());
    dispatch(getCustomProducts());
    dispatch(getDefaultAddress());
    dispatch(getCustomCart());
    dispatch(getCart());
  }, []);

  const {
    iduser,
    cartUser,
    customProducts,
    defaultAddress,
    idpayment,
    customCart,
  } = useSelector((state) => {
    return {
      iduser: state.usersReducer.iduser,
      cartUser: state.CartReducer.cartUser,
      customProducts: state.ProductsReducer.customProducts,
      defaultAddress: state.usersReducer.defaultAddress[0],
      idpayment: state.transactionsReducer.idpayment,
      customCart: state.CartReducer.customCart,
    };
  });

  // ====================================================================================
  // KERANJANG UMUM
  // Empty Cart Condition
  const isCartEmpty = () => {
    if (cartUser.length > 0) {
      return (
        <>
          <CardBody style={{ overflowY: 'auto', maxHeight: '50vh' }}>
            {renderCart(iduser)}
          </CardBody>
          <DropdownItem divider />
          <CardBody style={{ fontWeight: 'bold' }}>
            <CardText>
              <span>Subtotal</span>
              <span style={{ float: 'right' }}>
                Rp{totalPrice1().toLocaleString()}
              </span>
            </CardText>
          </CardBody>
        </>
      );
    } else {
      return (
        <>
          <CardBody style={{ textAlign: 'center' }}>
            <h5>Keranjangmu Kosong nih</h5>
            <Link
              to='/products?idcategory=1'
              style={{ textDecoration: 'none' }}
            >
              <Button color='success' outline block>
                Mulai Belanja
              </Button>
            </Link>
          </CardBody>
        </>
      );
    }
  };
  // Render card
  const renderCart = (iduser) => {
    if (cartUser.length > 0) {
      // console.log('cek default address: ', defaultAddress)
      return cartUser.map((item, index) => {
        return <CardCart key={index}>{item}</CardCart>;
      });
    }
  };
  // Total Price1 Function
  const totalPrice1 = () => {
    let totalPrice = 0;
    cartUser.forEach((e) => {
      totalPrice += e.price_pcs * e.qty;
    });
    return totalPrice;
  };
  //tooltip
  const toolTipBin = () => {
    if (cartUser.length > 0) {
      return (
        <UncontrolledTooltip placement='top' target='trashbinImage'>
          Delete item(s)
        </UncontrolledTooltip>
      );
    }
  };

  // ====================================================================================
  // KERANJANG CUSTOM ORDER

  // Titlecase Function
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const renderListInput = () => {
    if (customCart.length > 0) {
      return customCart.map((item, index) => {
        return (
          <div className='d-flex my-2'>
            <Input
              disabled={true}
              type='select'
              name={`select`}
              defaultValue={item.name}
              style={{ flex: 8, marginRight: 20, letterSpacing: 1.5 }}
            >
              <option>{toTitleCase(item.name)}</option>
            </Input>
            <Input
              disabled={true}
              type='text'
              defaultValue={item.qty_per_satuan}
              style={{ flex: 1, textAlign: 'center', letterSpacing: 1.5 }}
            />
          </div>
        );
      });
    } else {
      return resepList.map((e, index) => {
        return (
          <div className='d-flex my-2'>
            <Input
              disabled={false}
              type='select'
              name={`select`}
              onChange={(e) => handleBahan(e, index)}
              style={{ flex: 8, marginRight: 20, letterSpacing: 1.5, fontSize: 14 }}
            >
              <option> Masukkan Bahan... </option>
              {renderCustomProduct()}
            </Input>
            <Input
              disabled={false}
              type='number'
              onChange={(e) => {
                handleQty(e, index);
                subTotalResep();
              }}
              style={{ flex: 1, textAlign: 'center', letterSpacing: 1.5 }}
            />
          </div>
        );
      });
    }
  };

  const renderCustomProduct = () => {
    if (customProducts) {
      return customProducts.map((item, index) => {
        return (
          <option key={index} value={item.idproduct}>
            {toTitleCase(item.name)} ({item.satuan})
          </option>
        );
      });
    }
  };

  const handleBahan = (e, index) => {
    console.log('handlebahan: e => ', e.target.value, index);
    let list = [...resepList];
    list[index].idproduct = e.target.value;
  };

  const handleQty = (e, index) => {
    console.log('handleqty: e => ', e.target.value, index);
    let list = [...resepList];
    list[index].qty = e.target.value;
    console.log('cek reseplist handleqty: ', resepList);
  };

  const handleResep = (iduser) => {
    let list = [...resepList];

    list.push({ iduser, idproduct: null, qty: null });
    setResepList(list);
  };

  const subTotalResep = (e) => {
    let list = [...resepList];
    let subtotal = 0;
    if (customProducts) {
      customProducts.forEach((item) => {
        list.forEach((element) => {
          if (parseInt(item.idproduct) === parseInt(element.idproduct)) {
            subtotal += element.qty * item.price_per_satuan;
          }
        });
      });
    }
    console.log('satuan', subtotal);
    console.log('qtycapsule', qtyCapsule);
    console.log('subtotal', subtotal * qtyCapsule);
    setSubtotal(subtotal * qtyCapsule);
  };

  const btConfirmRecipe = () => {
    // resepList : [iduser, idproduct, qty]
    let cartCustom = [
      {
        iduser: iduser ? iduser : resepList[0].iduser,
        qty_kapsul: qtyCapsule,
        total_harga: subtotal,
      },
    ];
    let cartCustom_detail = [];
    let obj = {};

    resepList.forEach((item, index) => {
      obj['idproduct'] = item.idproduct;
      obj['qty_per_satuan'] = item.qty;
      customProducts.forEach((e) => {
        if (parseInt(e.idproduct) === parseInt(item.idproduct)) {
          obj['total_price_satuan'] = e.price_per_satuan * item.qty;
        }
      });
      cartCustom_detail.push(obj);
      obj = {};
    });

    console.log(
      'cek bawaan button konfirmasi resep: ',
      cartCustom,
      cartCustom_detail
    );
    dispatch(addCustomCart(cartCustom, cartCustom_detail));
  };

  // ====================================================================================
  // INFORMASI PEMBAYARAN & PENGIRIMAN
  // render alamat pengiriman
  const renderAlamat = () => {
    if (defaultAddress) {
      return (
        <>
          <CardTitle>
            <h6>Alamat Pengiriman</h6>
          </CardTitle>
          <DropdownItem divider />
          <CardTitle style={{ fontWeight: 'bold' }}>
            {defaultAddress.name}
          </CardTitle>
          <CardText>{defaultAddress.handphone}</CardText>
          <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -10 }}>
            {defaultAddress.alamat_detail}
          </CardText>
          <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -15 }}>
            {defaultAddress.kecamatan} - {defaultAddress.kota}
          </CardText>
          <CardText style={{ fontSize: 16, color: 'darkgrey', marginTop: -15 }}>
            {defaultAddress.provinsi} - {defaultAddress.kode_pos}
          </CardText>
          {/* <DropdownItem style={{ marginBottom: 20 }} divider /> */}
          {/* <>
            <Button color='secondary' outline>
              Pilih Alamat Lain
            </Button>
            <Button color='secondary' outline style={{ float: 'right' }}>
              + Tambah Alamat
            </Button>
          </> */}
        </>
      );
    }
  };

  // ====================================================================================
  // CHECKOUT
  const totalHarga = () => {
    let totalHarga = 0;
    {
      customCart.length > 0
        ? (totalHarga = totalPrice1() + customCart[0].total_harga)
        : (totalHarga = totalPrice1());
    }
    return totalHarga;
  };
  const totalOngkir = () => {
    return 10000;
  };
  const checkOut = () => {
    let checkoutcart = [];
    let checkoutcustom = [];
    let obj = {};
    let idCart = [];
    let idcartCustom = 0;
    let ongkir = totalOngkir();
    let total_payment = 0;
    let transaction_type = '';

    if (customCart.length > 0 && cartUser.length > 0) {
      console.log('cek 2 tipe terbaca');
      cartUser.forEach((item, index) => {
        obj['idproduct'] = item.idproduct;
        obj['iduser'] = item.iduser;
        obj['note'] = item.note;
        obj['qty_qo'] = item.qty;
        obj['total_price'] = item.qty * item.price_pcs;
        checkoutcart.push(obj);
        idCart.push(item.idcart);
        obj = {};
      });

      customCart.forEach((item) => {
        obj['idproduct'] = item.idproduct;
        obj['iduser'] = item.iduser;
        obj['qty_co'] = item.qty_per_satuan * item.qty_kapsul;
        obj['total_price'] = item.total_price_satuan * item.qty_kapsul;
        checkoutcustom.push(obj);
        obj = {};
      });
      idcartCustom = customCart[0].idcartCustom;
      transaction_type = 'ALL';
      total_payment = totalOngkir() + totalHarga() + subtotal;
      console.log(
        'cek bawaan button checkout ALL: ',
        checkoutcart,
        checkoutcustom,
        idCart,
        idcartCustom,
        ongkir,
        total_payment,
        defaultAddress.iduser_address,
        transaction_type
      );
      dispatch(
        addTransaction(checkoutcart, idCart, ongkir, total_payment, defaultAddress.iduser_address, transaction_type, checkoutcustom, idcartCustom));
    } else if (cartUser.length > 0) {
      console.log('cartuser terbaca');
      cartUser.forEach((item, index) => {
        obj['idproduct'] = item.idproduct;
        obj['iduser'] = item.iduser;
        obj['note'] = item.note;
        obj['qty_qo'] = item.qty;
        obj['total_price'] = item.qty * item.price_pcs;
        checkoutcart.push(obj);
        idCart.push(item.idcart);
        obj = {};
      });
      total_payment = totalOngkir() + totalHarga();
      transaction_type = 'QO';
      console.log(
        'cek bawaan button checkout: ',
        checkoutcart,
        idCart,
        ongkir,
        total_payment,
        defaultAddress.iduser_address,
        transaction_type
      );
      dispatch(
        addTransaction(
          checkoutcart,
          idCart,
          ongkir,
          total_payment,
          defaultAddress.iduser_address,
          transaction_type
        )
      );
    } else if (customCart.length > 0) {
      customCart.forEach((item) => {
        obj['idproduct'] = item.idproduct;
        obj['iduser'] = item.iduser;
        obj['qty_co'] = item.qty_per_satuan * item.qty_kapsul;
        obj['total_price'] = item.total_price_satuan * item.qty_kapsul;
        checkoutcustom.push(obj);
        obj = {};
      });
      idcartCustom = customCart[0].idcartCustom;
      total_payment = totalOngkir() + subtotal;
      transaction_type = 'CO';
      console.log(
        'cek bawaan button checkout custom: ',
        checkoutcustom,
        idcartCustom,
        ongkir,
        total_payment,
        defaultAddress.iduser_address,
        transaction_type
      );

      dispatch(
        addTransaction(
          checkoutcustom,
          idcartCustom,
          ongkir,
          total_payment,
          defaultAddress.iduser_address,
          transaction_type
        )
      );
    }
  };
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
    <Container className='d-flex'>
      {/* KERANJANG */}
      <div style={{ flex: 2, marginTop: 20 }}>
        <h3 style={{ color: '#27ae60' }}>Keranjang</h3>
        <Card>{isCartEmpty()}</Card>

        <h3 style={{ marginTop: 35, color: '#e74c3c' }}>
          Resep Dokter
        </h3>
        <Card style={{ marginBottom: 100 }}>
          <CardBody
            style={{ overflowY: 'auto', maxHeight: '50vh', letterSpacing: 1.5 }}
          >
            <FormGroup>
              <h6 style={{ display: 'flex', marginBottom: 20 }}>
                <span style={{ flex: 3 }}>Bahan Resep :</span>
                <span style={{ flex: 2, textAlign: 'right' }}>
                  <span style={{ paddingRight: 5 }}>Jumlah Dosis :</span>
                  <input
                    type='text'
                    style={{ paddingRight: 5 }}
                    disabled={disableInput}
                    onKeyUp={subTotalResep}
                    defaultValue={qtyCapsule}
                    onChange={(e) => setQtyCapsule(e.target.value)}
                    style={{ width: 50, textAlign: 'center' }}
                  />
                  <span style={{ marginLeft: 10 }}>Kapsul</span>
                </span>
              </h6>
              {renderListInput()}
            </FormGroup>
            {
              customCart.length > 0 ? (
                <Button
                  block
                  outline
                  color='danger'
                  onClick={() => {
                    dispatch(deleteCustomCart(customCart[0].idcartCustom));
                    setResepList([]);
                    window.location.reload(false);
                  }}
                >
                  Hapus Resep
                </Button>
              ) : (
                  <Button
                    block
                    outline
                    color='secondary'
                    onClick={() => handleResep(iduser)}
                  >
                    + Bahan Resep
                  </Button>
                )
              // <Button block outline color='secondary' onClick={() => handleResep(cartUser[0].iduser)}>+ Bahan Resep</Button>
            }
          </CardBody>
          <DropdownItem divider />
          <CardBody style={{ fontWeight: 'bold' }}>
            <CardText>
              <span>Subtotal</span>
              <span style={{ float: 'right' }}>
                Rp{' '}
                {customCart.length > 0
                  ? customCart[0].total_harga.toLocaleString()
                  : subtotal.toLocaleString()}
              </span>
            </CardText>
          </CardBody>
          <CardBody>
            {resepList && resepList.length >= 2 && (
              <Button
                disabled={confirmRecipe}
                block
                color='success'
                onClick={() => {
                  btConfirmRecipe();
                  setConfirmRecipe(!confirmRecipe);
                  setDisableInput(true);
                  dispatch(getCustomCart());
                }}
              >
                Konfirmasi Resep
              </Button>
            )}
          </CardBody>
        </Card>
      </div>

      {/* INFORMASI CHECKOUT */}
      <div style={{ flex: 1, marginTop: 60, marginLeft: 30 }}>
        <Card>
          <CardBody>
            <CardTitle>
              <h5>Ringkasan Pembayaran</h5>
            </CardTitle>
            <CardText>
              <span>Total Harga</span>
              <span style={{ float: 'right' }}>
                Rp{totalHarga().toLocaleString()}
              </span>
            </CardText>
            <CardText>
              <span>Ongkos Kirim</span>
              <span style={{ float: 'right' }}>
                Rp{
                  totalHarga() !== 0 &&
                  totalOngkir().toLocaleString()
                }
              </span>
            </CardText>
            <DropdownItem divider />
            <CardText style={{ fontSize: 20, fontWeight: '500' }}>
              <span>Total Tagihan</span>
              <span style={{ float: 'right' }}>
                Rp{
                  totalHarga() !== 0 &&
                  (totalHarga() + totalOngkir()).toLocaleString()
                }
              </span>
            </CardText>
          </CardBody>
        </Card>
        <CardBody style={{ marginTop: 30 }}>{renderAlamat()}</CardBody>
        <CardBody style={{ marginTop: 30 }}>
          <CardTitle>
            <h6>Metode Pembayaran</h6>
          </CardTitle>
          <DropdownItem divider />
          <>
            <img
              src='https://media.hitekno.com/thumbs/2019/03/21/96220-logo-go-pay/350x230-img-96220-logo-go-pay.jpg'
              width='25%'
              style={{ marginTop: -5 }}
            />
            {/* <Button color='success' outline style={{ float: 'right' }}>
              Pilih Metode
            </Button> */}
          </>
        </CardBody>
        <Button
          color='danger'
          block
          style={{ marginTop: 20 }}
          onClick={() => {
            checkOut();
            toggleModal();
          }}
        >
          <i
            className='material-icons'
            style={{
              fontSize: 25,
              color: 'white',
              position: 'relative',
              top: 5,
              right: 25,
            }}
          >
            verified_user
          </i>
          Konfirmasi Pesanan
        </Button>
      </div>

      {toolTipBin()}

      {/* MODAL PAYMENT */}
      <ModalPayment
        modal={modal}
        toggleModal={toggleModal}
        idpayment={idpayment}
        paymentSuccess={paymentSuccess}
      />
    </Container>
  );
};

export default CartPage;
