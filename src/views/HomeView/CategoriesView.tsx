import React from 'react';

const CategoriesView: React.SFC = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start h-screen justify-center items-center'>
      <section className='meal-image flex items-end w-full m-4 rounded-lg border border-gray-300 overflow-hidden cursor-pointer'>
        <div className='bg-white w-full h-32 text-center md:h-20 p-4'>
          <h4 className='font-medium text-xl'>Go out for a meal</h4>
          <p className='text-lg'>View the city's favorite dining venues</p>
        </div>
      </section>

      <section className='categories-image flex items-end w-full m-4 rounded-lg border border-gray-300 overflow-hidden cursor-pointer'>
        <div className='bg-white w-full h-32 text-center md:text-left md:h-20 p-4'>
          <h4 className='font-medium text-xl'>Nightlife &amp; Clubs</h4>
          <p className='text-lg'>Explore the city's top nightlife outlets</p>
        </div>
      </section>
    </div>
  );
};

export default CategoriesView;
