import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions';
import { Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import CardProduct from '../components/cardProduct';

const ProductPage = (props) => {
    console.log(props.location.search) //?category=demam
    // Dropdown Setting 
    const [dropdownName, setDropdownName] = useState('Sortir');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const dispatch = useDispatch()
    const { products } = useSelector(state => {
        return {
            products: state.ProductsReducer.products
        }
    })

    useEffect(() => {
        dispatch(getProducts(props.location.search))
    }, [])


    const renderProduct = () => {
        return products.map((item, index) => {
            return (
                <CardProduct key={index}>{item}</CardProduct>
            )
        })
    }

    // Sorting Function
    const sortProduct = (tipe, urutan) => {
        if (tipe === 'Nama' && urutan === 'ASC') {
            products.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
        } else if (tipe === 'Nama' && urutan === 'DESC') {
            products.sort((a, b) => {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            })
        } else if (tipe === 'Harga' && urutan === 'ASC') {
            products.sort((a, b) => {
                let priceA = parseInt(a.price);
                let priceB = parseInt(b.price);
                if (priceA < priceB) {
                    return -1;
                }
                if (priceA > priceB) {
                    return 1;
                }
                return 0;
            })
        } else if (tipe === 'Harga' && urutan === 'DESC') {
            products.sort((a, b) => {
                let priceA = parseInt(a.price);
                let priceB = parseInt(b.price);
                if (priceA > priceB) {
                    return -1;
                }
                if (priceA < priceB) {
                    return 1;
                }
                return 0;
            })
        }
        { renderProduct() }
    }

    // Category Title
    const renderCategory = () => {
        if (products.length > 0) {
            return (
                <div className="card-tranparent" style={{ display: 'flex' }}>
                    <img style={{ marginLeft: 7, marginBottom: 20, marginTop: 25 }} width='8%' src={products[0].thumb} alt={products[0].category} />
                    <h5 style={{ marginLeft: 20, marginTop: 33, letterSpacing: 2.5 }}>{products[0].category}</h5>
                </div>
            )
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    {renderCategory()}
                </Col>
                <Col>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle caret style={{ marginTop: 30, float: 'right' }} >
                            {dropdownName}
                        </DropdownToggle>
                        <DropdownMenu>
                            {/* <DropdownItem onClick={() => dispatch(getProducts())}>Kesesuaian</DropdownItem> */}
                            <DropdownItem onClick={() => sortProduct('Nama', 'ASC')}>Nama Produk (A-Z)</DropdownItem>
                            <DropdownItem onClick={() => sortProduct('Nama', 'DESC')}>Nama Produk (Z-A)</DropdownItem>
                            <DropdownItem onClick={() => sortProduct('Harga', 'ASC')}>Harga Terendah</DropdownItem>
                            <DropdownItem onClick={() => sortProduct('Harga', 'DESC')}>Harga Tertinggi</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                {renderProduct()}
            </Row>
        </Container>
    )
}

export default ProductPage;