import CallToAction from '../components/CallToAction';

const Projects = () => {
  return (
    <div
      className='min-h-screen max-w-2xl mx-auto flex justify-center items-center 
    flex-col gap-6 p-3 text-center'
    >
      <h1 className='text-3xl font-semibold'> Projects</h1>
      <p className='text-md text-gray-500'>
        Eleni's Bakery is a family-owned bakery that has been serving the
        community for over 30 years. We specialize in custom cakes, cookies, and
      </p>

      <CallToAction />
    </div>
  );
};

export default Projects;
