import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  NavbarCollapse,
  TextInput,
} from 'flowbite-react';

import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { FaMoon } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { RootState } from '../redux/store';

const Header = () => {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state: RootState) => state.user);

  console.log(currentUser);

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='bg-gradient-to-r font-bold  from-white via-green-700 to-red-700 text-white px-2 py-1 rounded-md'>
          Bulgarians
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline md:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden md:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser?.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                @{currentUser.username.slice(0, -4)}
              </span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue' outline>
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <NavbarCollapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
