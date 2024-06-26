import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormDataType } from '../types';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({} as FormDataType);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage('');
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setLoading(false);
        navigate('/');
      }
    } catch (error: { message: string }) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link
            to='/'
            className='flex  items-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
          >
            <div className='w-13 h-13 flex'>
              <img
                className='w-full h-full p-2'
                src='/public/logo.png'
                alt='logo'
              />
            </div>
          </Link>
          <p className='text-sm mt-5'>
            Willkommen! Bitte registrieren Sie sich, um Ihre Meinung zu unseren
            Produkten zu teilen.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Ihr Benutzername' />
              <TextInput
                type='text'
                placeholder='Benutzername'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Deine E-Mail' />
              <TextInput
                type='email'
                placeholder='Name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Deine passwort' />
              <TextInput
                type='password'
                placeholder='Passwort'
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
                'Anmelden'
              )}
            </Button>

            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Hast du bereits ein Konto?</span>
            <Link to='/sign-in' className='text-red-600'>
              Hier anmelden.
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

export default SignUp;
