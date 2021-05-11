import React from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import '../../Restaurant.css';

const ImageGrid: React.SFC = () => {
  const getRandomCuisineImage = () => {
    return Math.floor(Math.random() * (5 - 1)) + 1;
  };

  return (
    <div className='grid-layout h-screen-60 gap-2'>
      <img
        className='hover:scale-x-50 col-span-12 row-span-2 md:col-span-8 md:row-span-6 h-full w-full cursor-pointer'
        src={require(`../../assets/cuisine-${getRandomCuisineImage()}.jpg`)}
        alt='cuisine'
      />
      <img
        className='hover:scale-125 col-span-6 row-span-2 md:col-span-2 md:row-span-3 h-full w-full cursor-pointer'
        src={require(`../../assets/cuisine-${getRandomCuisineImage()}.jpg`)}
        alt='cuisine'
      />
      <div className='view-gallery flex justify-center items-center col-span-6 row-span-2 md:col-span-2 md:row-span-3 h-full w-full text-white font-hairline cursor-pointer'>
        View Gallery
      </div>
      <img
        className='col-span-6 row-span-2 md:col-start-9 md:col-span-2 md:row-span-3 h-full w-full cursor-pointer'
        src={require(`../../assets/cuisine-${getRandomCuisineImage()}.jpg`)}
        alt='cuisine'
      />{' '}
      <div className='add-photo flex flex-col justify-center items-center col-span-6 row-span-2 md:col-start-11 md:col-span-2 md:row-span-3 h-full w-full text-white font-hairline cursor-pointer'>
        <MdAddAPhoto
          size='40'
          color='#fff'
          className='bg-gray-900 opacity-50 rounded-full p-2'
        />
        Add Photos
      </div>
    </div>
  );
};

export default ImageGrid;
