import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../data/firebase'
import {
    collection,
    query,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
    getDocs,
    collectionGroup,
    where,
} from "firebase/firestore";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", async () => {

    const q = query(collection(db, "Trips")); //,where("ID_Car","==", "car01")
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
    });
    console.log("data Trips from firestore: " +  data);
    return data;
})

const tripSlice = createSlice({
    name: "trip",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

// export các action trong reducers
export const tripActions = tripSlice.actions;
export default tripSlice.reducer;