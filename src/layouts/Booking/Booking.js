import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Trip from './Trip'
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';
import {
  collection,
  query,
  onSnapshot,
  where,
  Timestamp ,
} from "firebase/firestore";
import { db } from "./../../data/firebase";

import dayjs from "dayjs";

const Booking = () => {
  const [data, setData] = useState([]);
  const stateSearch = useSelector(state => state.trip.stateSearch);
  const dispatch = useDispatch();

  const StartPoint = stateSearch[0].origin;
  const EndPoint = stateSearch[0].destination;
  const selectDate = stateSearch[0].selectDate;
  // console.log(StartPoint,EndPoint, selectDate)
  // const isoDate1 = Timestamp.fromDate(selectDate.toDate());
  // console.log("isoDate1: " + isoDate1)

  const addedDate = dayjs(selectDate).add(10, 'hour').toDate();
  const isoDate = Timestamp.fromDate(addedDate);
  console.log("isoDate: " + isoDate)

  useEffect(() => {
    const q = query(collection(db, "Trips"), where("StartPoint", "==", StartPoint),
     where("EndPoint", "==", EndPoint), where("StartTime", ">", isoDate ) ); // 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempDB = [];
      querySnapshot.forEach((doc) => {
        tempDB.push({ ...doc.data(), id: doc.id });

      });
      console.log(tempDB);
      setData(tempDB);
    })
    return () => unsubscribe();
  }, []);


  return (
    <>
      <Header />
      <Trip fetchData={data} />
      <Footer />
    </>
  )
}

export default Booking