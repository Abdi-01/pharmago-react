import React from 'react';
import Modal from 'react-awesome-modal';
import { Alert, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ForgotPassword = (props) => {
  const { register, errors, handleSubmit } = useForm();

  return (
    <Modal
      visible={props.visibleForgotPassword}
      width='550'
      height='350'
      effect='fadeInUp'
      onClickAway={props.closeForgotPassword}
    >
      <div className='m-3'>
        <h5 className='text-center'>Lupa Password?</h5>
        <hr />
        <div className='mt-3'>
          <form onSubmit={handleSubmit(props.submit)}>
            <div className='mb-3'>
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
              <label
                htmlFor='email'
                className='form-label pb-4'
                style={{ fontSize: '14px' }}
              >
                Masukkan email Anda. Sistem akan mengirimkan tautan ke email
                Anda untuk mengatur ulang kata sandi Anda.
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
            <div className='float-right mt-3 mb-5'>
              <Button
                outline
                className='mr-2'
                onClick={props.closeForgotPassword}
              >
                Close
              </Button>
              <Button type='submit' color='success'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
