import React from 'react';
import { useDispatch } from 'react-redux';
import { TiStar } from 'react-icons/ti';
import { MdImage } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { selectedRestaurantActionCreator } from '../../redux/restaurantSlice';
import { Restaurant } from '../../redux/type';

interface RestaurantDropDownViewProps {
  restaurant: Restaurant;
}

const RestaurantDropDownView: React.SFC<RestaurantDropDownViewProps> = ({
  restaurant,
}) => {
  const dispatch = useDispatch();

  const handleSelectedRestaurant = () => {
    dispatch(selectedRestaurantActionCreator(restaurant));
  };

  const splitLocalityName = (locality: string): string => {
    const streetCounty = locality.split(',');
    if (streetCounty.length === 2) {
      streetCounty.shift();
      const county = streetCounty.join('');
      return county;
    }
    return locality;
  };

  const handleSelectedRestaurantLink = (): string => {
    const slicedUrl = restaurant.url.slice(23, restaurant.url.lastIndexOf('?'));
    return `/${slicedUrl}-${restaurant.R.res_id}`;
  };
  return (
    <Link
      onClick={handleSelectedRestaurant}
      to={handleSelectedRestaurantLink()}
      className='flex justify-start p-4 hover:bg-gray-100 cursor-pointer'
    >
      <div className='h-16 w-16 flex items-center justify-center mr-4 rounded-md overflow-hidden'>
        {restaurant.thumb ? (
          <img
            className='bg-cover bg-no-repeat text-sm'
            src={restaurant.thumb}
            alt={restaurant.cuisines}
          />
        ) : (
          <MdImage color='#899db7' size='100%' />
        )}
      </div>
      <div className='flex flex-col justify-evenly'>
        <h1>{restaurant.name}</h1>
        {restaurant.user_rating.aggregate_rating === 0 ? null : (
          <div className='flex items-center h-3 w-3 my-2 bg-black rounded-sm'>
            <div>
              <TiStar size='.75rem' color='#fff' />
            </div>
            <h1 className='mx-2'>{restaurant.user_rating.aggregate_rating}</h1>
            <h1 className='text-sm text-gray-600 font-hairline'>
              &#40;{restaurant.user_rating.votes}&#41;
            </h1>
          </div>
        )}
        <div className='flex text-sm font-hairline text-gray-600'>
          <p>{splitLocalityName(restaurant.location.locality)}</p>
          <p>, {restaurant.location.city}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantDropDownView;
