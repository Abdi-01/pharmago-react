import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardText, CardTitle, Container, DropdownItem } from 'reactstrap';
import CardTransaction from '../components/cardTransaction';
import { getTransaction } from '../redux/actions';

const TransactionPage = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransaction(3))
    }, [])

    const { iduser, cartUser, customProducts, defaultAddress, transactions } = useSelector(state => {
        return {
            iduser: state.usersReducer.iduser,
            cartUser: state.CartReducer.cartUser,
            customProducts: state.ProductsReducer.customProducts,
            defaultAddress: state.usersReducer.defaultAddress[0],
            transactions: state.transactionsReducer.transactions
        }
    })

    const renderTransaction = () => {
        console.log('cek transactions reducer: ', transactions)
        if (transactions.length > 0) {
            return transactions.map((item, index) => {
                return (
                    <CardTransaction key={index}>{item}</CardTransaction>
                )
            })
        }
    }


    return (
        <Container className='d-flex'>
            {/* <div className='m-2' style={{flex: 1}}>
                <Card>
                    <CardBody>
                        <CardTitle>Ini Menu User Profil</CardTitle>
                        <DropdownItem divider />
                    </CardBody>
                </Card>
            </div> */}
            <div className='m-2' style={{flex: 4}}>
                <Card>
                    <CardBody>
                        <CardTitle>Daftar Belanja</CardTitle>
                        <DropdownItem divider style={{marginBottom: 20}} />
                        {renderTransaction()}
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default TransactionPage;