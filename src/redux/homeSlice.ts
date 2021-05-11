import {
  combineReducers,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import zomato from '../api/zomatoApi';
import { City } from './type';

//inital state for cities
const cities: City[] = [
  {
    id: 278,
    name: 'Austin, TX',
    country_id: 216,
    country_name: 'United States',
    country_flag_url:
      'https://b.zmtcdn.com/images/countries/flags/country_216.png',
    should_experiment_with: 0,
    has_go_out_tab: 0,
    discovery_enabled: 1,
    has_new_ad_format: 0,
    is_state: 0,
    state_id: 111,
    state_name: 'Texas',
    state_code: 'TX',
  },
];

//filter non alphabet or numeric characters and whitespace
const prepareStringForComparison = (city: string): string[] => {
  const filteredCityList = [];

  city = city
    .toLowerCase()
    .split('')
    .filter((str) => !str.includes(' ') && !str.includes(','))
    .join('');

  filteredCityList.push(city);
  return filteredCityList;
};

export const fetchCitiesAsyncThunk = createAsyncThunk<City[], { q: string }>(
  'cities/fetchCity',
  async ({ q }: { q: string }) => {
    try {
      const exactQueryMatchList: City[] = [];

      const response = await zomato.get('/cities', { params: { q } });
      const locations = response.data.location_suggestions;

      const listOfQueries = prepareStringForComparison(q);

      // Compare list of locations from response to the single query
      // to look for exact match
      locations.map((loc: City) => {
        const namesList = prepareStringForComparison(loc.name);
        namesList.map((n) => {
          if (n === listOfQueries[0]) exactQueryMatchList.push(loc);
        });
      });

      if (exactQueryMatchList.length) return exactQueryMatchList;
      else {
        return locations.length
          ? locations
          : Promise.reject(new Error('No results found'));
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const searchCitiesSlice = createSlice({
  name: 'citiesState',
  initialState: { cities, loading: false, error: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCitiesAsyncThunk.fulfilled,
      (state, { payload }: PayloadAction<City[]>) => {
        const cities: City[] = [];

        payload.map((loc: City) => {
          cities.push(loc);
        });
        return (state = { cities, loading: false, error: false });
      }
    );
    builder.addCase(fetchCitiesAsyncThunk.rejected, (state) => {
      return (state = { cities, loading: false, error: true });
    });
  },
});

const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState: null as City | null,
  reducers: {
    select: (state, { payload }: PayloadAction<City | null>) =>
      (state = payload),
  },
});

export const { select: selectedCityActionCreator } = selectedCitySlice.actions;

export const homeReducer = combineReducers({
  citiesState: searchCitiesSlice.reducer,
  selectedCity: selectedCitySlice.reducer,
});
