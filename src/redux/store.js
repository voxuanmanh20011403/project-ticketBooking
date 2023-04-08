import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk";
import tripsSilce from './slices/tripsSilce';

const store = configureStore({
    reducer: {
        trip: tripsSilce,
    },
    middleware: [thunkMiddleware],
});


export default store;