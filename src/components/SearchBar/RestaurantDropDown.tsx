import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/type';
import RestaurantDropDownView from './RestaurantDropDownView';
import RestaurantDropDownHeader from './RestaurantDropDownHeader';
import '../../DropDown.css';

const RestaurantDropDown: React.SFC = () => {
  const restaurantsState = useSelector(
    (state: State) => state.restaurantReducer.restaurantState
  );

  const renderTopTenRestaurants = () => {
    const restaurants = restaurantsState.restaurants;

    if (restaurants.length > 10) {
      const topTen = restaurants.slice(0, 10);
      return topTen;
    }
    return restaurants;
  };

  return (
    <div className='absolute top-0 right-0 z-20 flex flex-col bg-white rounded-md h-64 w-full md:w-9/12 lg:w-7/12 overflow-scroll'>
      {restaurantsState.error || restaurantsState.restaurants === null ? (
        <p className='ml-4 mt-8'>No results found =&#40;</p>
      ) : (
        restaurantsState.restaurants && (
          <div>
            <RestaurantDropDownHeader restaurants={renderTopTenRestaurants()} />

            <ul>
              {renderTopTenRestaurants().map((restaurant) => {
                return (
                  <li key={restaurant.id}>
                    <RestaurantDropDownView restaurant={restaurant} />
                  </li>
                );
              })}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default RestaurantDropDown;
