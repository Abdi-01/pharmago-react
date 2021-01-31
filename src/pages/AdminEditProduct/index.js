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
  CustomInput,
  Alert,
  FormFeedback,
  Card,
} from 'reactstrap';
import { addProduct, editProduct, getAllProducts } from '../../redux/actions';
import { API_URL } from '../../support/urlApi';

const AdminEditProduct = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllProducts());
    console.log('cek');
  }, []);

  const { errorStatus, category, allProducts } = useSelector(
    ({ ProductsReducer }) => {
      return {
        category: ProductsReducer.category,
        errorStatus: ProductsReducer.errorStatus,
        allProducts: ProductsReducer.allProducts,
      };
    }
  );

  const { idproduct } = props.match.params;
  let item = allProducts.filter(
    (elem, idx) => elem.idproduct === parseInt(idproduct)
  )[0];

  // console.log(typeof parseInt(idproduct), typeof item.idproduct);

  const [errMessage, setErrMessage] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    kategori: item.idcategory,
    desc_umum: item.desc_umum,
    desc_indikasi: item.desc_indikasi,
    desc_komposisi: item.desc_komposisi,
    desc_dosis: item.desc_dosis,
    desc_aturanpakai: item.desc_aturanpakai,
    desc_kontraindikasi: item.desc_kontraindikasi,
    desc_efeksamping: item.desc_efeksamping,
    desc_perhatian: item.desc_perhatian,
    stock_pcs: item.stock_pcs,
    qty_per_pcs: item.qty_per_pcs,
    satuan: item.satuan,
    price_pcs: item.price_pcs,
    type_obat: item.type_obat, // racik, umum
    isPublish: item.isPublish,
  });

  const [imageProduct, setImageProduct] = useState({
    product_image_file_name: '',
    product_image_file: '',
  });

  const {
    name,
    kategori,
    desc_umum,
    desc_indikasi,
    desc_komposisi,
    desc_dosis,
    desc_aturanpakai,
    desc_kontraindikasi,
    desc_efeksamping,
    desc_perhatian,
    stock_pcs,
    qty_per_pcs,
    satuan,
    price_pcs,
    type_obat,
    isPublish,
  } = formData;

  const { product_image_file_name, product_image_file } = imageProduct;

  const handleChange = (prop, value) => {
    setFormData({ ...formData, [prop]: value });
  };

  const handleProductImage = (e) => {
    console.log('file', e.target.files);
    if (e.target.files[0]) {
      setImageProduct({
        ...imageProduct,
        product_image_file_name: e.target.files[0].name,
        product_image_file: e.target.files[0],
      });
      let preview = document.getElementById('imgPreview');
      preview.src = URL.createObjectURL(e.target.files[0]);
      console.log('check img', preview);
    }
  };

  let checkRequiredField =
    name === '' ||
    kategori === '' ||
    stock_pcs === '' ||
    qty_per_pcs === '' ||
    satuan === '' ||
    price_pcs === '' ||
    type_obat === '';

  const onUpdate = () => {
    if (checkRequiredField) {
      setVisibleAlert(true);
      setErrMessage(
        'Kolom mandatory masih ada yang kosong, silahkan lengkapi!'
      );
      setTimeout(() => {
        setVisibleAlert(false);
      }, 3000);
    } else {
      dispatch(
        editProduct(
          idproduct,
          formData,
          imageProduct.product_image_file,
          () => {
            setVisibleAlert(true);
            setErrMessage('Produk berhasil diupdate!');
            setTimeout(() => {
              history.push('/admin-product');
              setVisibleAlert(false);
            }, 2000);
          }
        )
      );
    }
  };

  const onCancel = () => {
    history.push('/admin-product');
  };

  return (
    <div>
      <NavbarAdmin />

      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-9'>
          <Form>
            <h3 className='text-left mb-4'>Edit Produk</h3>
            <hr />

            {/* error message */}
            <Alert
              color={errMessage.includes('berhasil') ? 'success' : 'danger'}
              isOpen={visibleAlert}
              toggle={() => setVisibleAlert(false)}
              fade={false}
              className='text-center'
            >
              <h6>{errMessage}</h6>
            </Alert>

            <div className='row border rounded p-4'>
              <div className='col-6 border-right pr-5'>
                <FormGroup row className='position-relative'>
                  <i
                    class='material-icons position-absolute'
                    style={{
                      color: 'red',
                      left: '7.1rem',
                      top: '.5rem',
                      fontSize: 10,
                    }}
                  >
                    star
                  </i>
                  <Label for='name' sm={3}>
                    Nama Produk
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      defaultValue={name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className='position-relative'>
                  <i
                    class='material-icons position-absolute'
                    style={{
                      color: 'red',
                      left: '3.7rem',
                      top: '.5rem',
                      fontSize: 10,
                    }}
                  >
                    star
                  </i>
                  <Label for='price_pcs' sm={3}>
                    Harga
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='number'
                      name='price_pcs'
                      id='price_pcs'
                      defaultValue={price_pcs}
                      onChange={(e) =>
                        handleChange('price_pcs', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className='position-relative'>
                  <i
                    class='material-icons position-absolute'
                    style={{
                      color: 'red',
                      left: '5rem',
                      top: '.5rem',
                      fontSize: 10,
                    }}
                  >
                    star
                  </i>
                  <Label for='kategori' sm={3}>
                    Kategori
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='select'
                      name='kategori'
                      id='kategori'
                      defaultValue={item.idcategory}
                      onChange={(e) => handleChange('kategori', e.target.value)}
                    >
                      {/* <option defaultChecked={item.idcategory}>
                        {item.category}
                      </option> */}
                      {category.map((value, idx) => (
                        <option key={idx} value={value.idcategory}>
                          {value.category}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup row className='position-relative'>
                      <i
                        class='material-icons position-absolute'
                        style={{
                          color: 'red',
                          left: '3.5rem',
                          top: '.5rem',
                          fontSize: 10,
                        }}
                      >
                        star
                      </i>
                      <Label for='stock_pcs' sm={6}>
                        Stock
                      </Label>
                      <Col sm={6}>
                        <Input
                          type='number'
                          name='stock_pcs'
                          id='stock_pcs'
                          defaultValue={Math.floor(stock_pcs)}
                          onChange={(e) =>
                            handleChange('stock_pcs', e.target.value)
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row className='position-relative'>
                      <i
                        class='material-icons position-absolute'
                        style={{
                          color: 'red',
                          left: '4.1rem',
                          top: '.5rem',
                          fontSize: 10,
                        }}
                      >
                        star
                      </i>
                      <Label for='satuan' sm={3}>
                        Satuan
                      </Label>
                      <Col sm={9}>
                        <Input
                          type='text'
                          name='satuan'
                          id='satuan'
                          defaultValue={satuan}
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
                    <FormGroup row className='position-relative'>
                      <i
                        class='material-icons position-absolute'
                        style={{
                          color: 'red',
                          left: '6.1rem',
                          top: '.5rem',
                          fontSize: 10,
                        }}
                      >
                        star
                      </i>
                      <Label for='qty_per_pcs' sm={6}>
                        Qty Per Pcs
                      </Label>
                      <Col sm={6}>
                        <Input
                          type='number'
                          name='qty_per_pcs'
                          id='qty_per_pcs'
                          defaultValue={qty_per_pcs}
                          onChange={(e) =>
                            handleChange('qty_per_pcs', e.target.value)
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row className='position-relative'>
                      <i
                        class='material-icons position-absolute'
                        style={{
                          color: 'red',
                          left: '5.8rem',
                          top: '.5rem',
                          fontSize: 10,
                        }}
                      >
                        star
                      </i>
                      <Label for='type_obat' sm={6}>
                        Type Obat
                      </Label>
                      <Col sm={6}>
                        <Input
                          type='text'
                          name='type_obat'
                          id='type_obat'
                          defaultValue={type_obat}
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
                <FormGroup row className='position-relative'>
                  <i
                    class='material-icons position-absolute'
                    style={{
                      color: 'red',
                      left: '6.5rem',
                      top: '.5rem',
                      fontSize: 10,
                    }}
                  >
                    star
                  </i>
                  <Label for='product_image' sm={3}>
                    Foto Produk
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='file'
                      id='product_image'
                      label={product_image_file_name}
                      onChange={handleProductImage}
                    />
                  </Col>
                </FormGroup>

                <Card className='d-flex align-items-center p-5'>
                  <img id='imgPreview' width='30%' className='border' />
                </Card>
              </div>
              {/* start kolom 2 */}
              <div className='col-6 pl-5'>
                <FormGroup row>
                  <Label for='desc_umum' sm={3}>
                    Deskripsi Umum
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_umum'
                      id='desc_umum'
                      defaultValue={desc_umum}
                      onChange={(e) =>
                        handleChange('desc_umum', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_indikasi' sm={3}>
                    Indikasi
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_indikasi'
                      id='desc_indikasi'
                      defaultValue={desc_indikasi}
                      onChange={(e) =>
                        handleChange('desc_indikasi', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_komposisi' sm={3}>
                    Komposisi
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_komposisi'
                      id='desc_komposisi'
                      defaultValue={desc_komposisi}
                      onChange={(e) =>
                        handleChange('desc_komposisi', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_dosis' sm={3}>
                    Dosis
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_dosis'
                      id='desc_dosis'
                      defaultValue={desc_dosis}
                      onChange={(e) =>
                        handleChange('desc_dosis', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_aturanpakai' sm={3}>
                    Aturan Pakai
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_aturanpakai'
                      id='desc_aturanpakai'
                      defaultValue={desc_aturanpakai}
                      onChange={(e) =>
                        handleChange('desc_aturanpakai', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_kontraindikasi' sm={3}>
                    KontraIndikasi
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_kontraindikasi'
                      id='desc_kontraindikasi'
                      defaultValue={desc_kontraindikasi}
                      onChange={(e) =>
                        handleChange('desc_kontraindikasi', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_efeksamping' sm={3}>
                    Efek Samping
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_efeksamping'
                      id='desc_efeksamping'
                      defaultValue={desc_efeksamping}
                      onChange={(e) =>
                        handleChange('desc_efeksamping', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='desc_perhatian' sm={3}>
                    Perhatian
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='textarea'
                      name='desc_perhatian'
                      id='desc_perhatian'
                      defaultValue={desc_perhatian}
                      onChange={(e) =>
                        handleChange('desc_perhatian', e.target.value)
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='isPublish' sm={3}></Label>
                  <Col>
                    <CustomInput
                      type='switch'
                      id='isPublish'
                      name='isPublish'
                      label='Publish'
                      defaultChecked={isPublish}
                      onChange={(e) =>
                        handleChange('isPublish', e.target.checked)
                      }
                    />
                  </Col>
                </FormGroup>
                <div className='d-flex justify-content-end'>
                  <Button outline className='w-25 mr-3' onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button color='success' className='w-25' onClick={onUpdate}>
                    Update
                  </Button>
                </div>
              </div>
              {/* end kolom 2 */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
