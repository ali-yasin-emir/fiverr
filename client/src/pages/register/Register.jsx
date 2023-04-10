import React, { useState } from 'react';
import './Register.scss';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await upload(file);
      await newRequest.post('/auth/register', { ...user, img: url });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <div className='left'>
          <h1>Create a new account</h1>
          <label htmlFor=''>Username</label>
          <input
            onChange={handleChange}
            name='username'
            type='text'
            placeholder='johndoe'
          />
          <label htmlFor=''>Email</label>
          <input
            onChange={handleChange}
            name='email'
            type='email'
            placeholder='email'
          />
          <label htmlFor=''>Password</label>
          <input onChange={handleChange} name='password' type='password' />
          <label htmlFor=''>Profile Picture</label>
          <input onChange={(e) => setFile(e.target.files[0])} type='file' />
          <label htmlFor=''>Country</label>
          <input
            onChange={handleChange}
            name='country'
            type='text'
            placeholder='Usa'
          />
          <button type='submit'>Register</button>
        </div>
        <div className='right'>
          <h1>I want to become a seller</h1>
          <div className='toggle'>
            <label htmlFor=''>Activate the seller account</label>
            <label className='switch'>
              <input onChange={handleSeller} type='checkbox' />
              <span className='slider round'></span>
            </label>
          </div>
          <label htmlFor=''>Phone Number</label>
          <input
            onChange={handleChange}
            name='phone'
            type='text'
            placeholder='+1 234 567 89'
          />
          <label htmlFor=''>Description</label>
          <textarea
            placeholder='A short description of yourself'
            name='desc'
            id=''
            cols='30'
            rows='10'
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
