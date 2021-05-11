import {
  combineReducers,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import zomato from '../api/zomatoApi';
import { Restaurant } from '../redux/type';

export const fetchRestaurantsAsyncThunk = createAsyncThunk<
  Restaurant[],
  { q: string; entity_id: number }
>(
  'restaurantState/fetchRestaurants',
  async ({ q, entity_id }: { q: string; entity_id: number }) => {
    const response = await zomato.get('/search', {
      params: { q, entity_id, count: 20, entity_type: 'city' },
    });

    try {
      const restaurants: Restaurant[] = [];
      response.data.restaurants.map(({ restaurant }: any) => {
        restaurants.push(restaurant);
      });

      if (!restaurants.length)
        return Promise.reject(new Error('No results found'));
      return restaurants;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const fetchRestaurantAsyncThunk = createAsyncThunk<
  Restaurant,
  { q: string; res_id: number }
>(
  'selectedRestaurant,fetchRestaurant',
  async ({ q, res_id }: { q: string; res_id: number }) => {
    const response = await zomato.get('/restaurant', {
      params: { q, res_id },
    });
    try {
      const restaurant = response.data;
      if (!restaurant) return Promise.reject(new Error('No results found'));
      return restaurant;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const searchRestaurantsSlice = createSlice({
  name: 'restaurauntState',
  initialState: {
    restaurants: null as null | Restaurant[],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRestaurantsAsyncThunk.fulfilled,
      (state, { payload }: PayloadAction<Restaurant[]>) => {
        return (state = {
          restaurants: payload,
          loading: false,
          error: false,
        });
      }
    );
    builder.addCase(fetchRestaurantsAsyncThunk.rejected, (state) => {
      return (state = { restaurants: null, loading: false, error: true });
    });
  },
});

const selectedRestaurantSlice = createSlice({
  name: 'selectedRestaurant',
  initialState: null as null | Restaurant,
  reducers: {
    select: (state, { payload }: PayloadAction<null | Restaurant>) =>
      (state = payload),
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchRestaurantAsyncThunk.fulfilled,
      (state, { payload }: PayloadAction<Restaurant>) => {
        return (state = payload);
      }
    );
    builder.addCase(fetchRestaurantAsyncThunk.rejected, (state) => {
      return (state = null);
    });
  },
});

export const {
  select: selectedRestaurantActionCreator,
} = selectedRestaurantSlice.actions;

export const restaurantReducer = combineReducers({
  restaurantState: searchRestaurantsSlice.reducer,
  selectedRestaurant: selectedRestaurantSlice.reducer,
});
