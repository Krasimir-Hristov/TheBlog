import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
          Eleni's Bakery project is a great way to learn how to bake bread and
          pastries.
        </h2>

        <p className='text-gray-500 my-2'>
          {' '}
          Checkout these resources with 100 Bekery
        </p>
        <Button
          gradientDuoTone='cyanToBlue'
          className='rounded-tl-xl rounded-bl-none w-full'
        >
          <a
            href='https://www.krasimirxristov.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Contact with app Creator
          </a>
        </Button>
      </div>

      <div className='p-7 flex-1'>
        <img src='https://die-frau-am-grill.de/wp-content/uploads/brezel-selber-machen-rezept-die-frau-am-grill.jpg' />
      </div>
    </div>
  );
};

export default CallToAction;
