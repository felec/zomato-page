import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import { City } from '../../redux/type';
import '../../DropDown.css';

interface CityDropDownProps {
  citiesList: City[];
  selectedCity: Function;
}

const CityDropDown: React.SFC<CityDropDownProps> = (
  props: CityDropDownProps
) => {
  const getCurrentLoction = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords);
      },
      (err) => {
        console.log(err.message);
      }
    );
  };
  return (
    <div className='cities--drop-down absolute flex flex-col bg-white rounded-md h-64 w-full md:w-3/5 overflow-scroll'>
      <div
        onClick={getCurrentLoction}
        className='cursor-pointer hover:bg-gray-100 border-b p-4 mb-4 flex items-center'
      >
        <MdMyLocation color='#e8596a' size='1.2rem' />
        <h4 className='ml-2 text-red-600'>Detect current location</h4>
      </div>
      <h3 className='cursor-pointer p-4 text-gray-500'>Popular Locations</h3>
      <ul>
        {props.citiesList.map((city) => (
          <li
            key={city.id}
            onClick={() => {
              props.selectedCity(city);
            }}
            className='cursor-pointer hover:bg-gray-100 border-b p-4'
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityDropDown;
