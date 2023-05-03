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
  Timestamp,
} from "firebase/firestore";
import { db } from "./../../data/firebase";
import dayjs from "dayjs";
// Router
import { useNavigate } from "react-router-dom";



const Booking = () => {
  const [data, setData] = useState([]);

  const stateSearch = useSelector(state => state.trip.stateSearch);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const startPoint = stateSearch[0].origin;
      const endPoint = stateSearch[0].destination;
      const selectDate = stateSearch[0].selectDate;
      const addedDate = dayjs(selectDate).add(10, "hour").toDate();
      const isoDate = Timestamp.fromDate(addedDate);

      const q = query(
        collection(db, "Trips"),
        where("StartPoint", "==", startPoint),
        where("EndPoint", "==", endPoint),
        where("StartTime", ">", isoDate)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tempDB = [];
        querySnapshot.forEach((doc) => {
          tempDB.push({ ...doc.data(), id: doc.id });
        });
        console.log(tempDB);
        setData(tempDB);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(error);
      navigate("/");

    }
  }, [stateSearch, navigate]);



  return (
    <>
      <Header />
      <Trip fetchData={data} />
      <Footer />
    </>
  )
}

export default Booking