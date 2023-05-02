import {configureStore} from '@reduxjs/toolkit';
import thunk  from "redux-thunk";
import tripsSilce from './slices/tripsSilce';
import user from './reducers/user';

const store = configureStore({
    reducer: {
        trip: tripsSilce,
        user: user,
    },
    middleware: [thunk],
});


export default store;