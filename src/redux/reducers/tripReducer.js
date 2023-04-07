import { db } from './../../data/firebase';
import {
    collection,
    query,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from "firebase/firestore";

export const tripReducer = () => async (dispatch, getState) => {
    const dataTrips = [];
    try {
        const q = query(collection(db, "Trips"));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataTrips.push({ ...doc.data() });
            });
            console.log("data Trips from firestore: ", dataTrips);
            dispatch({ type: 'FETCH_FIRESTORE_DATA_SUCCESS', payload: dataTrips });
        });
    } catch (error) {
        dispatch({ type: 'FETCH_FIRESTORE_DATA_FAILURE', payload: error.message });
    }
};




