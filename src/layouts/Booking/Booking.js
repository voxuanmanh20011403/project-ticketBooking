import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from 'redux/slices/tripsSilce';
import Trip from './Trip'
import Header from 'layouts/Header/Header';
import Footer from 'layouts/Footer/Footer';


const Booking = () => {
  const dispatch = useDispatch();
  // const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    dispatch(fetchTrips())
  }, [dispatch]);
  // nhận dữ liệu cho fetchData 
  const fetchData = useSelector((state) => state.trip.data)
  console.log("fetchData: " + fetchData)
  
  return (
    <>
    <Header />
    <Trip fetchData={fetchData} />
    <Footer />
    </>
  )
}

export default Booking