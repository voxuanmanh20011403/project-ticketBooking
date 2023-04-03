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

  return <div>data from firestore</div>;
};

export default ReadDB;
