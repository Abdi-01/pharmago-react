import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, DropdownItem, Input } from 'reactstrap';
import { deleteCart, getCart, updateNote, updateQty } from '../redux/actions';
import { API_URL } from '../support/urlApi';

const CardCart = ({ children }) => {
  const dispatch = useDispatch();

  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState('')

  // Qty modification function
  const btQty = (type, qty, idcart) => {
    if (type === 'inc') {
      console.log('saya increment', qty, idcart);
      dispatch(updateQty(qty, 'inc', idcart));
    } else if (type == 'dec') {
      console.log('saya decrement');
      dispatch(updateQty(qty, 'dec', idcart));
    }
  };

  const handleNote = (e) => {
    console.log('handleNote: e => ', e.target.value);
    setNote(e.target.value)
  };


  return (
    <>
      <Link
        to={`/product-detail?idproduct=${children.idproduct}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className='card-tranparent d-flex'>
          <div style={{ flex: 1 }}>
            <img src={API_URL + children.product_image} width='90%' />
          </div>
          <div style={{ flex: 4, marginTop: 30 }}>
            <p>{children.name}</p>
            <p style={{ fontWeight: 'bold' }}>
              Rp.{children.price_pcs.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
      <div className='d-flex'>
        <div style={{ flex: 5 }}>
          {addNote === false ? (
            children.note ? (
              <p>
                <span
                  style={{
                    marginLeft: 10,
                    fontWeight: '400',
                    cursor: 'pointer',
                  }}
                >
                  {children.note}
                </span>
                <span
                  style={{
                    marginLeft: 10,
                    color: '#2ecc71',
                    fontWeight: '400',
                    cursor: 'pointer',
                  }}
                  onClick={() => setAddNote(!addNote)}
                >
                  Ubah
                </span>
              </p>
            ) : (
              <p
                style={{
                  marginLeft: 10,
                  color: '#2ecc71',
                  fontWeight: '400',
                  cursor: 'pointer',
                }}
                onClick={() => setAddNote(!addNote)}
              >
                Tambahkan catatan
              </p>
            )
          ) : (
            <Input
              type='text'
              onBlur={() => {
                setAddNote(!addNote);
                dispatch(updateNote(children.idcart, note))
              }}
              style={{ width: '60%' }}
              defaultValue={children.note ? children.note : ''}
              onChange={(e) => handleNote(e)}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <i
            className='large material-icons right-menu_icon'
            id='trashbinImage'
            style={{ fontSize: 30, marginTop: -8, cursor: 'pointer' }}
            onClick={() => {
              dispatch(deleteCart(children.idcart));
              dispatch(getCart());
            }}
          >
            delete
          </i>
        </div>
        <div style={{ flex: 3, marginTop: -20 }}>
          <Button
            color='warning'
            style={{
              marginTop: 15,
              borderRadius: 15,
              width: 30,
              height: 30,
              letterSpacing: 2,
              textAlign: 'center',
            }}
            onClick={() => btQty('dec', children.qty, children.idcart)}
          >
            <p
              style={{
                marginLeft: -3,
                marginTop: -14,
                fontWeight: 'bolder',
                fontSize: 25,
              }}
            >
              -
            </p>
          </Button>
          <Button
            color='success'
            disabled
            outline
            style={{
              marginTop: 15,
              borderRadius: 15,
              width: 60,
              height: 30,
              letterSpacing: 2,
              textAlign: 'center',
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <p
              style={{
                marginTop: -5,
                fontWeight: 'bolder',
                fontSize: 16,
                color: 'black',
              }}
            >
              {children.qty}
            </p>
          </Button>
          <Button
            color='warning'
            style={{
              marginTop: 15,
              borderRadius: 15,
              width: 30,
              height: 30,
              letterSpacing: 2,
              textAlign: 'center',
              marginRight: 10,
            }}
            onClick={() => btQty('inc', children.qty, children.idcart)}
          >
            <p
              style={{
                marginLeft: -7,
                marginTop: -14,
                fontWeight: 'bolder',
                fontSize: 25,
              }}
            >
              +
            </p>
          </Button>
        </div>
      </div>
      <DropdownItem divider style={{ marginLeft: 7, marginRight: 7 }} />
    </>
  );
};

export default CardCart;
