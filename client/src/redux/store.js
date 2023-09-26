import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './mapSlice';


const store = configureStore({
    reducer: {
        mapReducer: mapSlice
    },
});

export default store;
