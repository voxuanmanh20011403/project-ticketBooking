import React, { useState, useEffect } from "react";
import { db } from "./../../data/firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const ReadDB = () => {
  const [data, setData] = useState([]);
  const [dataSeat, setDataSeat] = useState([]);
  // Read data seat
  useEffect(() => {
    const tripsRef = doc(db, "Trips", "L3lHiHWBJK89CvEy7OnH");
    const seatRef = collection(tripsRef, "Seats");
    const q = query(seatRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempDB = [];
      querySnapshot.forEach((doc) => {
        tempDB.push({ ...doc.data() });
      });
      console.log("data seat: ", tempDB);
      setDataSeat(tempDB);
    });

    return () => unsubscribe();
  }, []);

  // read data from firestore
  useEffect(() => {
    const q = query(collection(db, "Trips"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempDB = [];
      querySnapshot.forEach((doc) => {
        tempDB.push({ ...doc.data() });
      });
      console.log("data Trips from firestore: ", tempDB);
      setData(tempDB);
    });
    return () => unsubscribe();
  }, []);
// booking.js
  // const startPoint = stateSearch[0].origin;
  // const endPoint = stateSearch[0].destination;
  // const selectDate = stateSearch[0].selectDate;


  // // console.log(StartPoint,EndPoint, selectDate)
  // // const isoDate1 = Timestamp.fromDate(selectDate.toDate());
  // // console.log("isoDate1: " + isoDate1)

  // const addedDate = dayjs(selectDate).add(10, 'hour').toDate();
  // const isoDate = Timestamp.fromDate(addedDate);
  // // console.log("isoDate: " + isoDate)


  // useEffect(() => {
  //   const q = query(collection(db, "Trips"), where("StartPoint", "==", startPoint),
  //     where("EndPoint", "==", endPoint), where("StartTime", ">", isoDate)); // 
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let tempDB = [];
  //     querySnapshot.forEach((doc) => {
  //       tempDB.push({ ...doc.data(), id: doc.id });

  //     });
  //     console.log(tempDB);
  //     setData(tempDB);
  //   })
  //   return () => unsubscribe();
  // }, []);

  // checkbox time
  // const morning = startHour >= 0 && startHour < 12;
  // const afternoon = startHour >= 12 && startHour < 19;
  // const night = startHour >= 19 && startHour < 24;
  // if(morning) {
  //   setTime("morning")
  // } else if(afternoon) {
  //   setTime("afternoon")
  // } else if(night){
  //   setTime("night")
  // }
  return <div>data from firestore</div>;
};

export default ReadDB;
