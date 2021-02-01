import React, { useEffect } from 'react';
import { CardCategory, Banner } from '../../components';
import { useDispatch } from 'react-redux';
import { resetProducts } from '../../redux/actions/productsAction';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProducts());
  }, []);

  return (
    <div className='container'>
      <div
        className='text-center w-75 m-auto'
        style={{
          padding: '2rem',
        }}
      >
        <h1 className='mb-3'>Selamat Datang di PharmaGo</h1>
        <p>
          <b>PharmaGO</b> merupakan salah satu aplikasi beli obat secara online.
          PharmaGO yang memiliki slogan #obataslikapanpun hadir sebagai Platform
          Beli Obat Online pertama di Indonesia yang benar-benar buka 24 jam
          nonstop dan terlengkap di Indonesia.
        </p>
      </div>
      <CardCategory />
      <Banner />
    </div>
  );
};

export default Home;
