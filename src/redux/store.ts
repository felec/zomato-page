import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './homeSlice';
import { restaurantReducer } from './restaurantSlice';

export default configureStore({
    reducer: {
        homeReducer,
        restaurantReducer,
    },
});
