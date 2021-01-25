import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Alert } from 'reactstrap';
import './login.css';

const Login = (props) => {
  const { register, errors, handleSubmit } = useForm();
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
              style={{ color: 'black' }}
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
            <div className='mb-4'>
              <label htmlFor='password' className='form-label'>
                Password
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
              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => (
                  <p className='mt-1 text-danger'>{message}</p>
                )}
              />
              <p
                className='text-right mt-2 text-secondary'
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
