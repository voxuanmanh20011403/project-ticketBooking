import {configureStore} from '@reduxjs/toolkit';
import thunk  from "redux-thunk";
import tripsSilce from './slices/tripsSilce';

const store = configureStore({
    reducer: {
        trip: tripsSilce,
    },
    middleware: [thunk],
});


export default store;