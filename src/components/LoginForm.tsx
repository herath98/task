import React, { useState } from 'react';
import { login } from '../services/authService';
import { setToken } from '../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      setToken(data.accessToken); // Store token
      navigate('/home');
      alert('Login successful');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen '>
      <div className='bg-white mt-20 shadow-md max-w-2xl justify-center mx-auto p-16 rounded-lg '>
        <h1 className='text-black flex justify-center '>Logging</h1>
    <form onSubmit={handleLogin}>
      <div className='flex  gap-8 my-5'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border-2 border-slate-800 w-32  h-5  rounded-lg'
        />
      </div>
      <div className='flex  gap-8 my-5'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
           className='border-2 border-slate-800 w-32  h-5  rounded-lg'
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='bg-slate-800 text-white rounded-lg px-4 py-2' type="submit ">Login</button>
    </form>
    </div>
    </div>
  );
};

export default Login;
