import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TiLocation, TiArrowSortedDown } from 'react-icons/ti';
import { RiSearchLine } from 'react-icons/ri';
import { BounceLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { CSSTransition } from 'react-transition-group';

import CityDropDown from './CityDropDown';
import RestaurantDropDown from './RestaurantDropDown';
import useClickOutside from '../../hooks/useClickOutside';
import { State, City } from '../../redux/type';
import { fetchRestaurantsAsyncThunk } from '../../redux/restaurantSlice';
import {
  selectedCityActionCreator,
  fetchCitiesAsyncThunk,
} from '../../redux/homeSlice';
import '../../SearchBar.css';

const cityLoader = css`
  margin: 0 0.4rem;
  margin-right: 1rem;
`;

const bouncerLoader = css`
  margin: 0 0.1rem;
`;

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector(
    (state: State) => state.homeReducer.citiesState.cities
  );
  const restaurants = useSelector(
    (state: State) => state.restaurantReducer.restaurantState.restaurants
  );
  const selected = useSelector(
    (state: State) => state.homeReducer.selectedCity
  );
  const isLoadingCities = useSelector(
    (state: State) => state.homeReducer.citiesState.loading
  );
  const isLoadingRestaurants = useSelector(
    (state: State) => state.restaurantReducer.restaurantState.loading
  );
  const [cityQuery, setCityQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCityDropDrown, setIsCityDropDrown] = useState<boolean>(false);
  const [isRestDropDrown, setIsRestDropDrown] = useState<boolean>(false);
  const elRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (cities.length > 1) setIsCityDropDrown(true);
  }, [cities]);

  useEffect(() => {
    if (!isLoadingRestaurants && restaurants) setIsRestDropDrown(true);
    else if (!isLoadingRestaurants && restaurants === null)
      setIsRestDropDrown(true);
  }, [isLoadingRestaurants, restaurants]);

  useEffect(() => {
    if (isCityDropDrown) setIsRestDropDrown(false);
  }, [isCityDropDrown]);

  useEffect(() => {
    if (isRestDropDrown) setIsCityDropDrown(false);
  }, [isRestDropDrown]);

  useEffect(() => {
    setIsCityDropDrown(false);
    setIsRestDropDrown(false);
  }, []);

  const onClickOutside = useCallback(() => {
    if (isCityDropDrown) setIsCityDropDrown(false);
    if (isRestDropDrown) setIsRestDropDrown(false);
  }, [isCityDropDrown, isRestDropDrown]);

  useClickOutside(elRef, onClickOutside);

  const handleCityDropDownOnChange = () => {
    setIsCityDropDrown(!isCityDropDrown);
    setIsRestDropDrown(false);
  };

  const handleRestDropDownOnChange = () => {
    setIsRestDropDrown(!isRestDropDrown);
    setIsCityDropDrown(false);
  };

  const updatedSelected = cities.find((city) => city === selected);

  const handleUISelectedCityChange = (): string => {
    return updatedSelected ? updatedSelected.name : cities[0].name;
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityQuery.length) {
      dispatch(fetchCitiesAsyncThunk({ q: cityQuery }));
      setCityQuery('');
    } else {
      dispatch(
        fetchRestaurantsAsyncThunk({
          q: searchQuery,
          entity_id: updatedSelected ? updatedSelected.id : cities[0].id,
        })
      );
      setSearchQuery('');
    }
  };

  const handleCityQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCityQuery(e.target.value);
    setIsCityDropDrown(false);
    setIsRestDropDrown(false);
  };

  const handleNewSelectedCity = (city: City) => {
    dispatch(selectedCityActionCreator(city));
    setIsCityDropDrown(false);
  };

  const handleSearchQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsRestDropDrown(false);
    setIsCityDropDrown(false);
  };

  const handleDropDownOnSelectedRestaurant = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsRestDropDrown(false);
  };

  return (
    <form
      ref={elRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={handleSearchSubmit}
      className='searchbar-shadow relative flex justify-evenly items-center h-12 w-11/12 md:w-7/12 xl:w-6/12 my-3 pl-1 bg-white rounded-md'
    >
      {isLoadingCities ? (
        <BounceLoader
          css={cityLoader}
          size={15}
          color={'#e8596a'}
          loading={isLoadingCities}
        />
      ) : (
        <TiLocation color='#e8596a' className='mr-1' size='3rem' />
      )}
      <input
        className='h-full w-full md:w-2/4 placeholder-gray-600 mr-2 rounded-md'
        type='text'
        name='city'
        placeholder={handleUISelectedCityChange()}
        value={cityQuery}
        onChange={handleCityQueryInput}
      />

      <input
        type='checkbox'
        className='checkbox-arrow z-20 opacity-0 cursor-pointer'
        onChange={handleCityDropDownOnChange}
        checked={isCityDropDrown}
      />
      <CSSTransition
        in={isCityDropDrown}
        classNames='cities--drop-down-'
        timeout={200}
        unmountOnExit={true}
      >
        <CityDropDown
          citiesList={cities}
          selectedCity={handleNewSelectedCity}
        />
      </CSSTransition>

      <TiArrowSortedDown
        className='arrow absolute'
        color='#4f4f4f'
        size='1.2rem'
      />
      <p className='text-gray-500 text-xl mx-1'>|</p>

      <input
        className='h-full w-full placeholder-gray-600 rounded-md'
        type='text'
        name='query'
        placeholder='Search for restaurant, cuisine or a dish'
        value={searchQuery}
        onChange={handleSearchQueryInput}
      />

      <input
        type='checkbox'
        className='checkbox-restaurant hidden'
        onChange={handleRestDropDownOnChange}
        checked={isRestDropDrown}
      />

      <CSSTransition
        in={isRestDropDrown}
        classNames='restaurants--drop-down- restaurants--container-'
        timeout={200}
        unmountOnExit={true}
      >
        <div
          onClick={handleDropDownOnSelectedRestaurant}
          className='restaurants--container h-full w-full'
        >
          <RestaurantDropDown />
        </div>
      </CSSTransition>

      <button
        type='submit'
        className='hover:bg-red-600 flex items-center focus:outline-none h-full bg-red-500 px-4 rounded-r-md'
      >
        {isLoadingRestaurants ? (
          <BounceLoader
            css={bouncerLoader}
            size={16}
            color={'#fff'}
            loading={isLoadingRestaurants}
          />
        ) : (
          <RiSearchLine color='#fff' size='1.2rem' />
        )}
      </button>
    </form>
  );
};
export default SearchBar;
