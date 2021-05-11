import React from 'react';
import { MdImage } from 'react-icons/md';
import { Restaurant } from '../../redux/type';

interface RestDropDownHeaderProps {
  restaurants: Restaurant[];
}

const RestaurantDropDownHeader: React.SFC<RestDropDownHeaderProps> = (
  props
) => {
  const renderHeaderType = () => {
    const restaurantToMatchAgainst = props.restaurants[0];

    //should only return relevant results to the query,
    //so match only the first part of the restrnt name,
    //and remove any trailing names eg: Starbucks-Marriott Hotel...
    let restFirstName = restaurantToMatchAgainst.name.split('-' && ' ');

    const checkAllMatch = props.restaurants.every((rest) => {
      return rest.name.startsWith(restFirstName[0]);
    });

    if (checkAllMatch) {
      return (
        <>
          <div className='flex items-center justify-between ml-4 mr-2 pt-6 pb-2'>
            <h1 className='text-sm text-gray-600'>Top Restaurants</h1>
            <h3 className='view-all text-sm text-red-500 cursor-pointer'>
              View all outlets{' '}
              <span className='view-arrow inline-block text-xl'>&rarr;</span>
            </h3>
          </div>
          <h2 className='ml-4'>
            View all {restaurantToMatchAgainst.name} outlets
          </h2>
        </>
      );
    }
    return (
      <div className='flex items-center ml-4 pt-6 pb-2 hover:bg-gray-100'>
        {restaurantToMatchAgainst.thumb ? (
          <img
            className='rounded-md h-16 w-16 bg-cover bg-no-repeat break-words'
            src={restaurantToMatchAgainst.thumb}
            alt='cuisine'
          />
        ) : (
          <MdImage size='4rem' color='#899db7' />
        )}
        <div className='flex flex-col ml-4'>
          <h1>{restaurantToMatchAgainst.cuisines}</h1>
          <h1 className='text-sm font-hairline text-gray-600'>Cuisine</h1>
        </div>
      </div>
    );
  };

  return <>{renderHeaderType()}</>;
};

export default RestaurantDropDownHeader;
