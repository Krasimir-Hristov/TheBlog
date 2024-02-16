import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='Name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='greenToBlue' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account?</span>
            <Link to='/sign-in' className='text-red-600'>
              Sign in here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
