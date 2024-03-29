import { Footer } from 'flowbite-react';
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitch,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-800'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='bg-gradient-to-r font-bold  from-white via-green-700 to-red-700 text-white px-2 py-1 rounded-md'>
                Bulgarians
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4  sm:grid-cols-3  sm:gap-6'>
            <div>
              <Footer.Title title='About 1' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='Link/1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link 1
                </Footer.Link>

                <Footer.Link
                  href='Link/2'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link 2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='About 2' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='Link/1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link 1
                </Footer.Link>

                <Footer.Link
                  href='Link/2'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Link 2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Other Stuffs' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Link 1</Footer.Link>

                <Footer.Link href='Link/2'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className='my-8' />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='Bulgarians Blog'
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsTwitch} />
            <Footer.Icon href='#' icon={BsDiscord} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
