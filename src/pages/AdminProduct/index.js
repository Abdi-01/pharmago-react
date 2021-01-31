import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavbarAdmin } from '../../components';
import Swal from 'sweetalert2';
import {
  Button,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from 'reactstrap';
import { deleteProduct, getAllProducts } from '../../redux/actions';

const AdminProduct = (props) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const history = useHistory();
  const { allProducts } = useSelector(({ usersReducer, ProductsReducer }) => {
    return {
      name: usersReducer.name,
      allProducts: ProductsReducer.allProducts,
    };
  });

  const handleButtonDetail = (idx) => {
    return history.push('/admin-product-detail', { index: idx });
  };

  const handleButtonEdit = (idproduct) => {
    return history.push(`/admin-edit-product/${idproduct}`);
  };

  const handleButtonDelete = (idproduct) => {
    Swal.fire({
      title: 'Hapus produk ini?',
      showCancelButton: true,
      confirmButtonText: `Hapus Produk`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(idproduct));
        dispatch(getAllProducts());
        Swal.fire('', 'Produk berhasil dihapus!', 'success');
      }
    });
  };

  const [search, setSearch] = useState([]);
  const onChangeSearch = (e) => {
    // console.log(e.target.value);
    let ItemSelected = allProducts.filter((elem, idx) => {
      let searchValue = elem.name.toLowerCase();
      // console.log(searchValue);
      return searchValue.indexOf(e.target.value) !== -1;
    });
    setSearch(ItemSelected);
  };

  // search function
  const renderSelected = search.length <= 0 ? allProducts : search;
  // console.log(Boolean(search.length <= 0));

  // render product lists
  const renderProducts = () => {
    return renderSelected.map((item, idx) => {
      return (
        <tr className='text-center' key={idx}>
          <th>{idx + 1}</th>
          <td className='text-left'>{item.name}</td>
          <td>Rp. {item.price_pcs.toLocaleString()}</td>
          <td className='text-center'>{Math.floor(item.stock_pcs)}</td>
          <td className='text-right'>{item.type_obat}</td>
          <th>
            <Button
              color='success'
              size='sm mr-3 mb-1'
              onClick={() => handleButtonDetail(idx)}
            >
              Detail Produk
            </Button>
            <Button
              outline
              size='sm mr-3 mb-1'
              onClick={() => handleButtonEdit(item.idproduct)}
            >
              Edit Produk
            </Button>
            <Button
              color='danger'
              size='sm mb-1'
              onClick={() => handleButtonDelete(item.idproduct)}
            >
              Delete Produk
            </Button>
          </th>
        </tr>
      );
    });
  };

  // Sort Function
  const sortProduct = (tipe, urutan) => {
    setSearch([]);
    if (tipe === 'Nama' && urutan === 'ASC') {
      allProducts.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    } else if (tipe === 'Nama' && urutan === 'DESC') {
      allProducts.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Harga' && urutan === 'ASC') {
      allProducts.sort((a, b) => {
        let priceA = parseInt(a.price_pcs);
        let priceB = parseInt(b.price_pcs);
        if (priceA < priceB) {
          return -1;
        }
        if (priceA > priceB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Harga' && urutan === 'DESC') {
      allProducts.sort((a, b) => {
        let priceA = parseInt(a.price_pcs);
        let priceB = parseInt(b.price_pcs);
        if (priceA > priceB) {
          return -1;
        }
        if (priceA < priceB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Stock' && urutan === 'ASC') {
      allProducts.sort((a, b) => {
        let stockA = parseInt(a.stock_pcs);
        let stockB = parseInt(b.stock_pcs);
        if (stockA < stockB) {
          return -1;
        }
        if (stockA > stockB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Stock' && urutan === 'DESC') {
      allProducts.sort((a, b) => {
        let stockA = parseInt(a.stock_pcs);
        let stockB = parseInt(b.stock_pcs);
        if (stockA > stockB) {
          return -1;
        }
        if (stockA < stockB) {
          return 1;
        }
        return 0;
      });
    } else if (tipe === 'Type' && urutan === 'ASC') {
      allProducts.sort((a, b) => {
        let typeA = a.type_obat.toUpperCase();
        let typeB = b.type_obat.toUpperCase();
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return 0;
      });
    }
    {
      renderProducts();
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-10'>
          <h3 className='text-center mb-5'>Master Produk</h3>
          <hr />
          <div className='row mb-3'>
            <div className='col-4 d-flex justify-content-start'>
              <div>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <DropdownToggle
                    caret
                    style={{
                      backgroundColor: 'grey',
                      border: '1px solid #714a4a',
                      width: '100%',
                      paddingTop: 7,
                      paddingBottom: 5,
                      paddingRight: 30,
                      paddingLeft: 30,
                      color: 'white',
                      letterSpacing: 2,
                    }}
                  >
                    Sorting
                  </DropdownToggle>
                  <DropdownMenu className='shadow'>
                    <DropdownItem
                      onClick={() => sortProduct('Nama', 'ASC')}
                      className='border-bottom'
                    >
                      Nama Produk (A-Z)
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Nama', 'DESC')}
                      className='border-bottom'
                    >
                      Nama Produk (Z-A)
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Harga', 'ASC')}
                      className='border-bottom'
                    >
                      Harga Terendah
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Harga', 'DESC')}
                      className='border-bottom'
                    >
                      Harga Tertinggi
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Stock', 'ASC')}
                      className='border-bottom'
                    >
                      Stock Terendah
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Stock', 'DESC')}
                      className='border-bottom'
                    >
                      Stock Tertinggi
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => sortProduct('Type', 'ASC')}
                      className='border-bottom'
                    >
                      Type Obat
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className='col-4 d-flex justify-content-center'>
              <Input
                placeholder='Cari produk'
                className='text-center'
                onChange={onChangeSearch}
              />
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <Button
                color='success'
                size='sm mb-3'
                onClick={() => history.push('/admin-add-product')}
              >
                Tambah Produk
              </Button>
            </div>
          </div>
          <Table hover bordered>
            <thead>
              <tr className='text-center'>
                <th>No</th>
                <th className='w-50'>Nama Produk</th>
                <th>Harga</th>
                <th>Stock</th>
                <th>Type Obat</th>
                <th className='w-25'>Action</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
