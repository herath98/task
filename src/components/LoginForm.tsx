import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';




interface FormData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const API_URL = 'https://skill-test.similater.website/api/v1';

  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const { loading, error } = useSelector((state: { user: { loading: boolean; error: string } }) => state.user);
  const navigate = useNavigate();



  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      
      const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
       console.error((data.message));
        return;
      }
      
      navigate('/home');
    } catch (error) {
     
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        
      </form>
      
     
    </div>
  );
}

export default SignIn;

function useSelector(arg0: (state: { user: { loading: boolean; error: string; }; }) => { loading: boolean; error: string; }): { loading: any; error: any; } {
  throw new Error('Function not implemented.');
}
