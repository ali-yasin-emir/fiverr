import React, { useState } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await newRequest.post('/auth/login', { username, password });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor=''>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name='username'
          type='text'
          placeholder='johndoe'
        />

        <label htmlFor=''>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name='password'
          type='password'
        />
        <button type='submit'>Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
