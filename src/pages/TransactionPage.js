import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardImg, CardText, CardTitle, Container, DropdownItem } from 'reactstrap';
import CardTransaction from '../components/cardTransaction';
import { getCart, getTransaction } from '../redux/actions';

const TransactionPage = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransaction())
        dispatch(getCart())
    }, [])

    const { transactions } = useSelector(state => {
        return {
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
            <div className='m-2' style={{flex: 4}}>
                <Card>
                    <CardBody style={{position: 'relative'}}>
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