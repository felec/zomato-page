import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import SearchBar from '../../components/SearchBar/';
import RestaurantDetails from './RestaurantDetails';
import RestaurantImageGrid from './RestaurantImageGrid';
import { State } from '../../redux/type';
import '../../Restaurant.css';
import { fetchRestaurantAsyncThunk } from '../../redux/restaurantSlice';

const Restaurant = () => {
  const selected = useSelector(
    (state: State) => state.restaurantReducer.selectedRestaurant
  );
  const params: any = useParams();
  const dispatch = useDispatch();

  const searchBarQuery = () => {
    let rest = params.restaurant;
    rest = rest.split('-');
    const resId = rest.slice(rest.length - 1);
    rest.splice(rest.length - 1);
    rest = rest.join(' ');

    dispatch(fetchRestaurantAsyncThunk({ q: rest, res_id: resId[0] }));
  };

  useEffect(() => {
    if (!selected) {
      searchBarQuery();
    }
  }, [selected]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row justify-evenly items-center border-b pb-1 mx-2'>
        <div className='flex items-center md:hidden'>
          <h2 className='hover:text-gray-800 font-hairline text-gray-600 mr-8 cursor-pointer'>
            Login
          </h2>
          <Link to='/'>
            <em className='zomato-header cursor-pointer'>zomato</em>
          </Link>
          <h2 className='hover:text-gray-800 text-base font-hairline text-gray-600 ml-8 cursor-pointer'>
            Signup
          </h2>
        </div>
        <Link to='/'>
          <em className='hidden md:block zomato-header cursor-pointer'>
            zomato
          </em>
        </Link>

        <SearchBar />
        <div className='hidden md:flex justify-evenly md:justify-start lg:justify-start'>
          <h2 className='md:block lg:block hover:text-gray-800 text-base font-hairline text-gray-600 mr-8 cursor-pointer'>
            Login
          </h2>
          <h2 className='md:block hover:text-gray-800 text-base font-hairline text-gray-600 mr-2 cursor-pointer'>
            Signup
          </h2>
        </div>
      </div>

      {selected ? (
        <div className='flex flex-col md:mx-24 mx-2 my-3'>
          <div className='hidden md:flex mb-2'>
            <span className='hover:text-red-600 text-xs text-gray-600 mr-1 md:mr-2 cursor-pointer'>
              Home
            </span>
            <span className='text-xs text-gray-600 mr-1 md:mr-2'>&#47;</span>
            <span className='hover:text-red-600 text-xs text-gray-600 mr-1 md:mr-2 cursor-pointer'>
              United States
            </span>
            <span className='text-xs text-gray-600 mr-1 md:mr-2'>&#47;</span>
            <span className='hover:text-red-600 text-xs text-gray-600 mr-1 md:mr-2 cursor-pointer'>
              {selected.name}
            </span>
            <span className='text-xs text-gray-600 mr-1 md:mr-2'>&#47;</span>
            <span className='text-xs text-gray-500'>{selected.name}</span>
          </div>
          <RestaurantImageGrid />
          <RestaurantDetails details={selected} />
        </div>
      ) : (
        <div className='min-h-screen min-w-screen'>Loading</div>
      )}
    </div>
  );
};

export default Restaurant;
