import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { BloodIcon, DrugIcon, IvIcon } from '../../assets';
import './slide.css';
import { getCategory } from '../../redux/actions/productsAction';
import { useDispatch, useSelector } from 'react-redux';

const CardCategory = () => {
  // GET CATEGORY
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const { category } = useSelector(state => {
    return {
      category: state.ProductsReducer.category
    }
  })

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

  const image = [
    BloodIcon,
    DrugIcon,
    IvIcon,
    BloodIcon,
    DrugIcon,
    BloodIcon,
    DrugIcon,
    IvIcon,
    BloodIcon,
    DrugIcon,
  ];


  const handleCategory = (idx) => {
    alert(idx);
  };

  return (
    <div className='mt-5'>
      <Slider {...settings}>
        <div style={{ width: 200 }}>
          <img src={BloodIcon} width='30%' style={{ marginTop: 20 }} />
          <p style={{ fontSize: 15, textAlign: 'center', paddingTop: 20 }}>
            Custom Orders
          </p>
        </div>
        {category.length > 0 && category.map((item, idx) => {
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
                    fontSize: 15,
                    textAlign: 'center',
                    paddingTop: 20,
                    wordWrap: true,
                  }}
                >
                  {/* Category - {idx + 1} */}
                  {item.category}
                </p>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardCategory;
