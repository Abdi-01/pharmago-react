import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Progress,
  Alert,
} from 'reactstrap';
import { registerUser } from '../../redux/actions/usersAction';

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handphone: '',
    password: '',
    confirmPassword: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kode_pos: '',
    alamat_detail: '',
  });

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [mailValidasi, setMailValidasi] = useState(false);
  const [phoneValidasi, setPhoneValidasi] = useState(false);
  const [confirmPasswordValidasi, setConfirmPasswordValidasi] = useState(false);
  const [checkPassword, setCheckPassword] = useState({
    passwordValue: 0,
    passwordLevel: '',
    passwordNotification: '',
  });

  let { passwordValue, passwordLevel, passwordNotification } = checkPassword;
  let {
    name,
    email,
    handphone,
    password,
    confirmPassword,
    provinsi,
    kota,
    kecamatan,
    kode_pos,
    alamat_detail,
  } = formData;

  const handleChange = (prop, value) => {
    let abjad = /[a-z]/i;
    let number = /[0-9]/;
    let symbol = /[!@#$%^&*():]/;
    let suffix = /(.id|.com|.co.id|.edu|.tech)/;
    let phone = /^[0-9]*$/;

    setFormData({ ...formData, [prop]: value });

    if (prop === 'email') {
      setMailValidasi(
        abjad.test(value) && symbol.test(value) && suffix.test(value)
          ? true
          : false
      );
    } else if (prop === 'password') {
      if (
        abjad.test(value) &&
        !number.test(value) &&
        !symbol.test(value) &&
        value.length > 7
      ) {
        setCheckPassword({
          ...checkPassword,
          passwordValue: 30,
          passwordLevel: 'Weak',
          passwordNotification: 'danger',
        });
      } else if (
        abjad.test(value) &&
        number.test(value) &&
        !symbol.test(value) &&
        value.length > 7
      ) {
        setCheckPassword({
          ...checkPassword,
          passwordValue: 70,
          passwordLevel: 'Middle',
          passwordNotification: 'warning',
        });
      } else if (
        abjad.test(value) &&
        number.test(value) &&
        symbol.test(value) &&
        value.length > 7
      ) {
        setCheckPassword({
          ...checkPassword,
          passwordValue: 100,
          passwordLevel: 'Strong',
          passwordNotification: 'success',
        });
      } else {
        setCheckPassword({
          ...checkPassword,
          passwordValue: 15,
          passwordLevel: 'Easy',
          passwordNotification: 'danger',
        });
      }
    } else if (prop === 'confirmPassword') {
      setConfirmPasswordValidasi(password === value ? true : false);
    } else if (prop === 'handphone') {
      setPhoneValidasi(phone.test(value) ? true : false);
    }
  };

  const checkEmptyForm =
    name === '' ||
    email === '' ||
    handphone === '' ||
    password === '' ||
    confirmPassword === '' ||
    provinsi === '' ||
    kota === '' ||
    kecamatan === '' ||
    kode_pos === '' ||
    alamat_detail === '';

  const data = {
    name,
    email,
    handphone,
    password,
    provinsi,
    kota,
    kecamatan,
    alamat_detail,
    kode_pos,
  };

  const onSubmit = () => {
    if (checkEmptyForm) {
      setVisibleAlert(true);
      setMessage('Form masih ada yang kosong, silahkan lengkapi!');
      setTimeout(() => {
        setVisibleAlert(false);
      }, 3000);
    } else if (mailValidasi && phoneValidasi && confirmPasswordValidasi) {
      console.log(data);
      dispatch(
        registerUser(data, () => {
          setVisibleAlert(true);
          setMessage(
            'Selamat, Registrasi anda berhasil, silahakn cek email untuk verifikasi Akun Anda !'
          );
          setTimeout(() => {
            history.push('/');
            setVisibleAlert(false);
          }, 3000);
        })
      );
    }
  };

  const disableSubmit =
    mailValidasi && phoneValidasi && confirmPasswordValidasi & !checkEmptyForm
      ? false
      : true;

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12'>
          <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
            <h4> Daftar Akun Baru PharmaGO</h4>
            <p style={{ color: 'grey', fontSize: '14px' }}>
              Sudah punya akun?
              <span style={{ color: 'black' }} role='button'>
                {' '}
                Silahkan Login
              </span>
            </p>
            <Alert
              color={message.includes('Selamat') ? 'success' : 'danger'}
              isOpen={visibleAlert}
              toggle={() => setVisibleAlert(false)}
              fade={false}
            >
              {message}
            </Alert>
          </div>

          <div className='col-12'>
            <Form>
              <div className='row'>
                <div className='col-6'>
                  <div className='mt-3'>
                    <FormGroup>
                      <Label>Nama</Label>
                      <Input
                        type='text'
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className='mt-3'>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type='email'
                        onChange={(e) => handleChange('email', e.target.value)}
                        valid={mailValidasi}
                        invalid={email.length > 0 && !mailValidasi}
                      />
                      <FormFeedback valid>Email address valid</FormFeedback>
                      <FormFeedback>Invalid email address</FormFeedback>
                    </FormGroup>
                  </div>
                  <div className='mt-3'>
                    <FormGroup>
                      <Label>No Telepon</Label>
                      <Input
                        type='text'
                        onChange={(e) =>
                          handleChange('handphone', e.target.value)
                        }
                        valid={phoneValidasi}
                        invalid={handphone.length > 0 && !phoneValidasi}
                      />
                      <FormFeedback>No telepon harus angka</FormFeedback>
                    </FormGroup>
                  </div>
                  <div className='mt-3'>
                    <FormGroup className='position-relative'>
                      <Label>Password</Label>
                      <Input
                        type={!visiblePassword ? 'password' : 'text'}
                        onChange={(e) =>
                          handleChange('password', e.target.value)
                        }
                        className='mb-2'
                        placeholder='Min. 8 Character ( Abjad, Number, Symbol)'
                      />
                      <i
                        className='material-icons position-absolute'
                        role='button'
                        style={{
                          left: '29.2rem',
                          top: '2.5rem',
                          fontSize: 20,
                        }}
                        onClick={togglePassword}
                      >
                        remove_red_eye
                      </i>
                      {password.length > 7 && (
                        <Progress
                          animated
                          value={passwordValue}
                          color={passwordNotification}
                        >
                          {passwordLevel}
                        </Progress>
                      )}
                    </FormGroup>
                  </div>
                  <div className='mt-3'>
                    <FormGroup className='position-relative'>
                      <Label>Konfirmasi Password</Label>
                      <Input
                        type={!visibleConfirmPassword ? 'password' : 'text'}
                        onChange={(e) =>
                          handleChange('confirmPassword', e.target.value)
                        }
                        valid={confirmPasswordValidasi}
                        invalid={
                          confirmPassword.length > 0 && !confirmPasswordValidasi
                        }
                      />
                      <i
                        className='material-icons position-absolute'
                        role='button'
                        style={{
                          left: '29.2rem',
                          top: '2.5rem',
                          fontSize: 20,
                        }}
                        onClick={toggleConfirmPassword}
                      >
                        remove_red_eye
                      </i>
                      <FormFeedback valid>Password sama</FormFeedback>
                      <FormFeedback>Password tidak sama</FormFeedback>
                    </FormGroup>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='mt-3'>
                    <FormGroup>
                      <Label>Provinsi</Label>
                      <Input
                        type='text'
                        onChange={(e) =>
                          handleChange('provinsi', e.target.value)
                        }
                      />
                    </FormGroup>
                  </div>
                  <div className='mt-3'>
                    <FormGroup>
                      <Label>Kota</Label>
                      <Input
                        type='text'
                        onChange={(e) => handleChange('kota', e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className='row'>
                    <div className='col-8'>
                      <div className='mt-3'>
                        <FormGroup>
                          <Label>Kecamatan</Label>
                          <Input
                            type='text'
                            onChange={(e) =>
                              handleChange('kecamatan', e.target.value)
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='mt-3'>
                        <FormGroup>
                          <Label>Kode Pos</Label>
                          <Input
                            type='text'
                            onChange={(e) =>
                              handleChange('kode_pos', e.target.value)
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <FormGroup>
                      <Label>Alamat Lengkap</Label>
                      <Input
                        type='textarea'
                        onChange={(e) =>
                          handleChange('alamat_detail', e.target.value)
                        }
                      />
                    </FormGroup>
                  </div>
                  <Button
                    disabled={disableSubmit}
                    color='success'
                    className='w-100 mt-3'
                    onClick={onSubmit}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
