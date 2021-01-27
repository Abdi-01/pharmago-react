import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import { NavbarAdmin } from '../../components';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
} from 'reactstrap';

const AdminAddProduct = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    product_image: '',
    banner_image: '',
    desc_umum: '',
    desc_indikasi: '',
    desc_komposisi: '',
    desc_dosis: '',
    desc_aturanpakai: '',
    desc_kontraindikasi: '',
    desc_efeksamping: '',
    desc_perhatian: '',
    stock_pcs: 0,
    qty_per_pcs: 0,
    satuan: '',
    type_obat: '', // racik, umum
    isPublish: '',
  });

  const handleChange = (prop, value) => {
    setFormData({ ...formData, [prop]: value });
    console.log(formData.name);
  };

  return (
    <div>
      <NavbarAdmin />

      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-8'>
          <h3 className='text-center mb-4'>Master Produk</h3>
          <hr />
          <div className='border rounded p-5'>
            <div className='col-6'>
              <Form>
                <FormGroup row>
                  <Label for='name' sm={3}>
                    Nama Produk
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup row>
                      <Label for='stock' sm={6}>
                        Stock
                      </Label>
                      <Col sm={6}>
                        <Input
                          type='number'
                          name='stock'
                          id='stock'
                          onChange={(e) =>
                            handleChange('stock', e.target.value)
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row>
                      <Label for='satuan' sm={3}>
                        Satuan
                      </Label>
                      <Col sm={9}>
                        <Input
                          type='text'
                          name='satuan'
                          id='satuan'
                          onChange={(e) =>
                            handleChange('satuan', e.target.value)
                          }
                          placeholder='Kemasan/Botol'
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup row>
                      <Label for='qty_per_pcs' sm={6}>
                        Qty Per Pcs
                      </Label>
                      <Col sm={6}>
                        <Input
                          type='number'
                          name='qty_per_pcs'
                          id='qty_per_pcs'
                          onChange={(e) =>
                            handleChange('qty_per_pcs', e.target.value)
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row>
                      <Label for='type_obat' sm={4}>
                        Type Obat
                      </Label>
                      <Col sm={8}>
                        <Input
                          type='text'
                          name='type_obat'
                          id='type_obat'
                          onChange={(e) =>
                            handleChange('type_obat', e.target.value)
                          }
                          placeholder='Umum/Racik'
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <FormGroup row>
                  <Label for='product_image' sm={3}>
                    Foto Produk
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='file'
                      name='product_image'
                      id='product_image'
                      onChange={(e) =>
                        handleChange('product_image', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='banner_image' sm={3}>
                    Banner
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='file'
                      name='banner_image'
                      id='banner_image'
                      onChange={(e) =>
                        handleChange('banner_image', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div className='col-6'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
