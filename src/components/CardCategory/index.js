import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';
import { BloodIcon, DrugIcon, IvIcon } from '../../assets';
import './slide.css';
import { getCategory } from '../../redux/actions/productsAction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CardCategory = () => {
  // GET CATEGORY
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const { category, iduser } = useSelector(
    ({ ProductsReducer, usersReducer }) => {
      return {
        category: ProductsReducer.category,
        iduser: usersReducer.iduser,
      };
    }
  );

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: true,
    className: 'slides',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // custom order button function
  const history = useHistory();
  const onClickCustomOrder = () => {
    if (iduser) {
      history.push('/cart');
    } else {
      Swal.fire('', 'Silahkan login untuk Custom Order!', 'info');
    }
  };

  const renderCategory = () => {
    return (
      category.length > 0 &&
      category.map((item, idx) => {
        if (item.idcategory != 9) {
          return (
            <Link to={`/products?idcategory=${item.idcategory}`} key={idx}>
              <div style={{ width: 200 }}>
                <img
                  src={item.thumb}
                  width='30%'
                  alt={item.category}
                  style={{ marginTop: 20 }}
                />
                <p
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    paddingTop: 20,
                    wordWrap: true,
                    color: 'white',
                  }}
                >
                  {/* Category - {idx + 1} */}
                  {item.category === 'CUSTOM ORDER'
                    ? 'OBAT RACIK'
                    : item.category}{' '}
                </p>
              </div>
            </Link>
          );
        }
      })
    );
  };

  return (
    <div className='mt-5'>
      <div>
        <h4 className='text-center'>Menu Kategori Pilihan</h4>
        <hr className='mt-4 mb-4' />
      </div>
      <Slider {...settings}>
        <div style={{ width: 200 }} onClick={onClickCustomOrder}>
          <img src={BloodIcon} width='30%' style={{ marginTop: 20 }} />
          <p
            style={{
              fontSize: 15,
              textAlign: 'center',
              paddingTop: 20,
              color: 'white',
            }}
          >
            CUSTOM ORDER
          </p>
        </div>
        {renderCategory()}
      </Slider>
    </div>
  );
};

export default CardCategory;
