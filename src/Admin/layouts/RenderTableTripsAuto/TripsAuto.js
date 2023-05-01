import { db } from "data/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import _ from "lodash";

export const TripsAuto = () => {
  const [listCars, setListCars] = useState([]);
  useEffect(() => {
    const getCars = async () => {
      const querySnapshot = await getDocs(collection(db, "ListCar"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListCars(data);
    };

    getCars();
  }, []);

  const [groupLists, setGroupList] = useState([]);
  const groupsRef = collection(db, "Trips");
  const getGroups = query(groupsRef, orderBy("StartTime", "asc"));
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(getGroups);
      setGroupList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [groupLists]);

  const groupedData = _.groupBy(groupLists, "ID_Car");
  useEffect(() => {
    const intervalId = setInterval(function () {
      var now = new Date();
      if (now.getHours() === 8 && now.getMinutes() === 12) {
        for (let i = 0; i < listCars.length; i++) {
          const car = listCars[i];
          if (groupedData[car.ID_Car]) {
            console.log(`Car ${car.ID_Car} tồn tại `);
            const lengData =
              groupedData[car.ID_Car][groupedData[car.ID_Car].length - 1];
            const StartTime = lengData.StartTime;

            //cộng ngày chạy
            const date = StartTime.toDate();
            date.setDate(date.getDate() + 2);
            //chuyển vào fb
            const fromDate = new Date(date);
            const timestamp = Timestamp.fromDate(date);

            //só seat:
            let id = 0;
            let name = "A";
            let newState = [];
            for (var ii = 1; ii <= car.Seat; ii++) {
              id++;
              newState.push({
                id: id,
                name: name + ii,
                status: "empty",
                ui: "",
              });
            }
            try {
              const docRef = addDoc(collection(db, "Trips"), {
                EndPoint: car.EndPoint,
                Hotline: car.Hotline,
                ID_Car: car.ID_Car,
                ID_Garage: car.ID_Garage,
                LicensePlate: car.LicensePlate,
                Namegarage: car.Namegarage,
                PakingEnd: car.PakingEnd,
                PakingStart: car.PakingStart,
                Price: car.Price,
                Seat: newState,
                StartPoint: car.StartPoint,
                TypeVehicle: car.TypeVehicle,
                duration: car.duration,
                StartTime: timestamp,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {}
            // console.log('groupLists2',groupLists);
            clearInterval(intervalId);
           
          } else {
            console.log(`Car ${car.ID_Car} ko tồn tại `);

            //dưeaj vào starttimn
            //
          }
        }
      }
     
    }, 100);
  }, [setGroupList]);

  return <></>;
};
