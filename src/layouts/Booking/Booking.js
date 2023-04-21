import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Trip from './Trip'
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';

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
        tempDB.push({ ...doc.data() , id: doc.id});
      });
      // console.log("data Trips from firestore: ", tempDB);
      setData(tempDB);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <>
    <Header />
    <Trip fetchData={fetchData} />
    <Footer />
    </>
  )
}

export default Booking