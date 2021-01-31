import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { Badge, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const CardTransaction = ({ children }) => {
    Moment.locale('id')

    const [classCard, setClassCard] = useState('my-3')

    const countProduct = () => {
        let count = 0
        children.products.forEach(e => {
            count += 1
        })
        return count -1
    }

    return (
        <Card style={{ cursor: 'pointer' }} className={classCard} body outline color='success' onMouseEnter={() => setClassCard('my-3 shadow rounded') } onMouseLeave={() => setClassCard('my-3')}>
            <Link to={`/order-detail?idtransaction=${children.idtransaction}`} style={{ textDecoration: 'none', color: 'black' }} >
                <CardBody>
                    <div>
                        <div>
                            {
                                children.transaction_type === 'CO' ?
                                    "Pesanan Obat Resep"
                                    : children.transaction_type === 'QO' ?
                                        "Pesanan Obat"
                                        :
                                        "Pesanan Obat Umum & Resep"
                            }
                            <div style={{ textAlign: 'right', display: 'inline', float: 'right', fontSize: 13, color: 'grey' }}>
                                {
                                    children.payment_status === 'paid' ?
                                    <Badge color='success' style={{padding: 5}}>{children.payment_status}</Badge>
                                    :
                                    <Badge color='secondary' style={{padding: 5}}>{children.payment_status}</Badge>
                                }
                                <p>ORDER-ID : {children.invoice_number}</p>
                            </div>
                        </div>
                        <p style={{ color: 'grey', fontSize: 13 }}>{Moment(children.created_at).format('ll')}, {Moment(children.created_at).format('LT')} WIB</p>
                    </div>
                    {/* <CardImg  /> */}
                    <div>
                        {
                            countProduct() === 0 ?
                                <CardTitle>{children.products[0].name}</CardTitle>
                                :
                                <CardTitle>{children.products[0].name} <span style={{ fontSize: 13, color: 'grey' }}>[+ {countProduct()} barang]</span></CardTitle>
                        }
                    </div>
                </CardBody>
            </Link>
        </Card>
    )
}

export default CardTransaction;