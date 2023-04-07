import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from 'redux/slices/tripsSilce';
import Trip from './Trip'


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
    <Trip fetchData={fetchData} />
  )
}

export default Booking