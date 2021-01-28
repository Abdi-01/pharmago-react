import React, { useRef, useState } from 'react';
import { Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { accountVerify } from '../../redux/actions';

const Verify = (props) => {
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();
  const [visibleAlert, setVisibleAlert] = useState(false);

  // show error notification setting
  const otp = useRef({});
  otp.current = watch('otp', '');

  const dispatch = useDispatch();

  const { token } = props.match.params;

  const onSubmit = (data) => {
    const { otp } = data;
    dispatch(
      accountVerify(otp, token, () => {
        setVisibleAlert(true);
        // console.log(otp, token, visibleAlert);
        setTimeout(() => {
          history.push('/');
        }, 3000);
      })
    );
  };

  return (
    <div
      className='row d-flex justify-content-center align-items-center'
      style={{ marginTop: '10rem' }}
    >
      <div className='col-3 '>
        <div className='m-3'>
          <h4 className='text-center'>AKUN VERIFIKASI</h4>
          <hr />

          <p className='form-label pb-1' style={{ fontSize: '14px' }}>
            Silakan masukkan kode OTP yang sudah dikirim melalui email Anda
            untuk melakukan verifikasi Akun Anda.
          </p>

          {/* success notification */}
          {visibleAlert && (
            <Alert
              color='success'
              isOpen={visibleAlert}
              toggle={() => setVisibleAlert(false)}
            >
              Selamat akun Anda sudah terverifikasi.
            </Alert>
          )}

          <div className='mt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label htmlFor='otp' className='form-label'>
                  Kode OTP
                </label>
                <input
                  type='text'
                  name='otp'
                  className='form-control'
                  id='otp'
                  ref={register({
                    required: 'OTP is required.',
                  })}
                />
                {errors.password && (
                  <p
                    style={{
                      color: '#bf1650',
                      fontSize: '13px',
                      paddingTop: '5px',
                    }}
                  >
                    {errors.otp.message}
                  </p>
                )}
              </div>
              <div>
                <Button type='submit' color='success' className='w-100 mt-2'>
                  Verifikasi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
