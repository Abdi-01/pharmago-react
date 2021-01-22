import React, { useRef, useState } from 'react';
import { Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../redux/actions';

const ResetPassword = (props) => {
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();
  const [visibleAlert, setVisibleAlert] = useState(false);

  // show error notification setting
  const password = useRef({});
  password.current = watch('password', '');

  const dispatch = useDispatch();

  const { iduser } = props.match.params;

  const onSubmit = (data) => {
    const { password } = data;
    dispatch(
      resetPassword(password, iduser, () => {
        setVisibleAlert(true);
        console.log(password, iduser, visibleAlert);
        setTimeout(() => {
          history.push('/');
        }, 3000);
      })
    );
  };

  return (
    <div className='row d-flex justify-content-center align-items-center mt-5'>
      <div className='col-3 '>
        <div className='m-3'>
          <h4 className='text-center'>Reset Password</h4>
          <hr />

          <p className='form-label pb-1' style={{ fontSize: '14px' }}>
            Silakan masukkan dan konfirmasi kata sandi baru Anda di bawah untuk
            mengakses akun Anda.
          </p>

          {/* success notification */}
          {visibleAlert && (
            <Alert
              color='success'
              isOpen={visibleAlert}
              toggle={() => setVisibleAlert(false)}
            >
              Selamat password anda berhasil diperbaharui.
            </Alert>
          )}

          <div className='mt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password Baru
                </label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  id='password'
                  ref={register({
                    required: 'Password is required.',
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
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className='mb-3'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Konfirmasi Password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  className='form-control'
                  id='confirmPassword'
                  ref={register({
                    validate: (value) =>
                      value === password.current ||
                      'The passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p
                    style={{
                      color: '#bf1650',
                      fontSize: '13px',
                      paddingTop: '5px',
                    }}
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div>
                <Button type='submit' color='success' className='w-100 mt-2'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
