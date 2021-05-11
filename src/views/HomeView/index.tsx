import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/';
import CategoriesView from './CategoriesView';
// import CollectionsView from './CollectionsView';
import { State } from '../../redux/type';
import '../../Home.css';

const Home: React.FC = () => {
  const selected = useSelector(
    (state: State) => state.homeReducer.selectedCity
  );
  const cities = useSelector(
    (state: State) => state.homeReducer.citiesState.cities
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUISelectedCityChange = (): string => {
    const updatedSelected = cities.find((city) => city.name === selected?.name);
    return updatedSelected?.name ? updatedSelected.name : cities[0].name;
  };

  return (
    <div>
      <div className='header-image flex flex-col justify-center items-center h-screen-90'>
        <em className='zomato-title'>zomato</em>
        <h2 className='header-two font-sans font-medium text-center text-4xl text-white my-2'>
          Discover the best food &amp; drinks in{' '}
          <span className='font-sans font-semibold text-4xl text-white'>
            {handleUISelectedCityChange()}
          </span>
        </h2>
        <SearchBar />
      </div>

      <div className='flex flex-col mx-20 content-between'>
        <CategoriesView />
        {/* <CollectionsView /> */}
      </div>
    </div>
  );
};

export default Home;
