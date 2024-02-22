import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

import { FormDataType } from '../types';
import { RootState } from '../redux/store';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({} as FormDataType);

  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error: { message: string }) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='bg-gradient-to-r font-bold   from-white via-green-700 to-red-700 text-white px-2 py-1 rounded-md'>
              Bulgarians
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            If you want to learn a lot about Bulgaria, or simply to get news
            related to the country, you are in the right place.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='Name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**************'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='greenToBlue'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <div>
                  <Spinner size='sm' /> <span className='pl-3'>Loading...</span>{' '}
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-red-600'>
              Sign up here.
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
