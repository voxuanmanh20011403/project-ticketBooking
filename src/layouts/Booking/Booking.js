import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Trip from './Trip'
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "./../../data/firebase";
import { tripActions } from 'redux/slices/tripsSilce';

const Booking = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // const stateSearch = useSelector(state => state.trip.stateSearch);
  // console.log(dispatch(tripActions.addSearch()))
  // console.log("stateSearch: " + stateSearch);

  useEffect(() => {
    const q = query(collection(db, "Trips")); //,where("ID_Car","==", "car01")
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempDB = [];
      querySnapshot.forEach((doc) => {
        tempDB.push({ ...doc.data() });
      });
      // console.log("data Trips from firestore: ", tempDB);
      setData(tempDB);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <Trip fetchData={data} />
  )
}

export default Booking