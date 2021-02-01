import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Alert } from 'reactstrap';
import './login.css';

const Login = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [visiblePassword, setVisiblePassword] = useState(false);

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <Modal
      visible={props.visible}
      width='450'
      height='550'
      effect='fadeInUp'
      onClickAway={props.closeModal}
    >
      <div style={{ margin: '3rem', color: 'black', borderRadius: '20px' }}>
        <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
          <h4>Login PharmaGO</h4>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            Belum punya akun?
            <span
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                textDecoration: 'underline',
              }}
              onClick={props.linkToRegister}
              role='button'
            >
              {' '}
              Daftar
            </span>
          </p>
        </div>
        {/* alert message  */}
        {props.errorStatus ? (
          <Alert
            color='danger'
            isOpen={props.visibleAlert}
            toggle={props.closeAlert}
          >
            {props.errorMessage}
          </Alert>
        ) : (
          <Alert
            color='success'
            isOpen={props.visibleAlert}
            toggle={props.closeAlert}
          >
            {props.errorMessage}
          </Alert>
        )}

        <div>
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                id='email'
                ref={register({
                  required: 'Email is required.',
                })}
              />
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ message }) => (
                  <p className='mt-1 text-danger'>{message}</p>
                )}
              />
            </div>
            <div className='mb-4 position-relative'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type={!visiblePassword ? 'password' : 'text'}
                name='password'
                className='form-control'
                id='password'
                ref={register({
                  required: 'Password is required.',
                })}
              />
              <i
                className='material-icons position-absolute'
                role='button'
                style={{
                  left: '19.7rem',
                  top: '2.6rem',
                  fontSize: 20,
                }}
                onClick={togglePassword}
              >
                remove_red_eye
              </i>

              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => (
                  <p className='mt-1 text-danger'>{message}</p>
                )}
              />
              <p
                className='text-right mt-2 text-secondary '
                onClick={props.openForgotPassword}
                role='button'
              >
                Lupa Password?
              </p>
            </div>
            <button type='submit' className='btn btn-success w-100'>
              Login
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
