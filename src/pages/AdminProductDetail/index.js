import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { NavbarAdmin } from '../../components';
import {
  Button,
  Card,
  CardImg,
  Table,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from 'reactstrap';
import { API_URL } from '../../support/urlApi';
import { ImageNotFound } from '../../assets';

const AdminProductDetail = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const history = useHistory();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { index } = props.location.state;
  const { allProducts } = useSelector(({ ProductsReducer }) => {
    return {
      allProducts: ProductsReducer.allProducts,
    };
  });

  // render product lists
  const renderProductDetail = () => {
    return allProducts.map((item, idx) => {
      if (index === idx) {
        return (
          <div className='row' key={idx}>
            <div className='col-4'>
              <Card className='shadow'>
                <CardImg
                  top
                  width='70%'
                  src={
                    item.product_image === null
                      ? ImageNotFound
                      : API_URL + item.product_image
                  }
                  alt={item.name}
                />
              </Card>
            </div>
            <div className='col-8'>
              <div className='row'>
                {/* section header */}
                <div className='col-4'>
                  <p
                    className='border-bottom pb-1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Nama Produk
                  </p>
                  <p
                    className='border-bottom pb-1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Kategori
                  </p>
                  <p
                    className='border-bottom pb-1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Harga
                  </p>
                  <p
                    className='border-bottom pb-1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Stock
                  </p>
                  <p
                    className='border-bottom pb-1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Total Netto
                  </p>
                </div>
                <div className='col-8'>
                  <p className='border-bottom pb-1'>{item.name}</p>
                  <p className='border-bottom pb-1'>
                    {item.category === 'CUSTOM ORDER'
                      ? 'OBAT RACIK'
                      : item.category}
                  </p>
                  <p className='border-bottom pb-1'>
                    Rp. {item.price_pcs.toLocaleString()}
                  </p>
                  <p className='border-bottom pb-1'>
                    {Math.floor(item.stock_pcs)}{' '}
                    {item.type_obat === 'racik' ? 'item' : item.satuan}
                  </p>
                  <p className='border-bottom pb-1'>
                    {Math.floor(item.total_stock_satuan)}{' '}
                    {item.type_obat === 'racik' ? item.satuan : null}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-12 mt-5'>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}
                  >
                    Deskripsi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    Komposisi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3');
                    }}
                  >
                    Dosis
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '4' })}
                    onClick={() => {
                      toggle('4');
                    }}
                  >
                    Aturan Pakai
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '5' })}
                    onClick={() => {
                      toggle('5');
                    }}
                  >
                    Perhatian
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '6' })}
                    onClick={() => {
                      toggle('6');
                    }}
                  >
                    Indikasi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '7' })}
                    onClick={() => {
                      toggle('7');
                    }}
                  >
                    Kontraindikasi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '8' })}
                    onClick={() => {
                      toggle('8');
                    }}
                  >
                    Efek Samping
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_umum}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='2'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_komposisi}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='3'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_dosis}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='4'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_aturanpakai}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='5'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_perhatian}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='6'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_indikasi}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='7'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_kontraindikasi}</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='8'>
                  <Row>
                    <Col sm='12 pt-3 pl-4'>
                      <p>{item.desc_efeksamping}</p>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <NavbarAdmin />

      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-8'>
          <h3 className='text-left mb-4'>Produk Detail</h3>
          <hr />
          <div className='row'>
            <div className='col-12 d-flex justify-content-end'>
              <Button
                color='danger'
                size='sm mb-3'
                onClick={() => history.push('/admin-product')}
              >
                Kembali
              </Button>
            </div>
          </div>
          <div className='border rounded p-5'>{renderProductDetail()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;

// desc_aturanpakai: "Berikan bersama atau tanpa makanan"
// desc_dosis: "Dewasa dan remaja > 10 tahun : 5 - 7.5 ml. Diberikan 3 kali sehari. Anak (6 - 17 tahun) : 5 ml. Diberikan 3 kali sehari. Anak (1 - 5 tahun) : 2.5 ml. Diberikan 3 kali sehari. Lama terapi : Sekurang-kurangnya 1 minggu, berikan hingga 2 - 3 hari sesudah gejala mereda."
// desc_efeksamping: "-"
// desc_indikasi: "PROSPAN SIRUP merupakan obat batuk herbal dengan zat aktif Hedera Helix (Special Ivy Extract EA 575). Prospan berkhasiat membantu meredakan batuk berdahak dengan mengencerkan dahak dan melegakan saluran pernapasan."
// desc_komposisi: "Per 100 mL : Ekstrak daun Ivy kering 0.7 g, larutan Sorbitol 70%, K Sorbate 0.134 g, Citric acid"
// desc_kontraindikasi: "Hipersensitivitas."
// desc_perhatian: "Intoleransi fruktosa. Hamil dan laktasi"
// desc_umum
