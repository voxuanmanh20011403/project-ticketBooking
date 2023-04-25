import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
const initialState = {
    stateSearch: [],
    stateBooking: [],
}
const tripSlice = createSlice({
    name: "trip",
    initialState,
    reducers: {
        addSearch:(state, action) =>{
            console.log("Test reducers addSearch");
            state.stateSearch.push(action.payload); 
        },
        addBooking:(state,action) => {
            console.log("Test reducers addbooking")
            state.stateBooking.push(action.payload); 
            // return {
            //     ...state,
            //     stateBooking: [...state.stateBooking, (action.payload)],
            // }
        },
    }
})
export const asyncAddBooking = createAsyncThunk(
    'trip/addBooking',
    async (bookingData, thunkAPI) => {
      const response = await fetch('/booking', {
        method: 'POST',
        body: JSON.stringify(bookingData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      return data;
    }
  );

// export các action trong reducers
export const tripActions = tripSlice.actions;
export default tripSlice.reducer;