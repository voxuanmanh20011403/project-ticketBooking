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
  const groupsRef = collection(db, "Tripss");
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
      if (now.getHours() == 11 && now.getMinutes() === 31) {
        for (let i = 0; i < listCars.length; i++) {
          const car = listCars[i];
          // Tính khoảng cách giữa 2 ngày dưới dạng số mili giây
          const diffMillis =
            car.StartTimeNext.toDate() - car.StartTime.toDate();
          // Chuyển đổi số mili giây thành số ngày
          const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24));

          if (groupedData[car.ID_Car]) {
            console.log(`Car ${car.ID_Car} tồn tại `);
            const lengData =
              groupedData[car.ID_Car][groupedData[car.ID_Car].length - 1];
            const StartTime = lengData.StartTime;

            //cộng ngày chạy
            const date = StartTime.toDate();
            date.setDate(date.getDate() + diffDays);

            //chuyển vào fb
            const fromDate = new Date(date);
            const timestamp = Timestamp.fromDate(date);
            console.log("datexyz", timestamp.toDate());

            //endTime
            const dateEnd = timestamp.toDate();
            dateEnd.setHours(dateEnd.getHours() + car.duration);
            const fromDateEnd = new Date(dateEnd);
            const timestampEnd = Timestamp.fromDate(dateEnd);

            //só seat:
            let id = 0;
            let name = "A";
            let newState = [];
            for (var ii = 1; ii <= car.seat; ii++) {
              id++;
              newState.push({
                id: id,
                name: name + ii,
                status: "empty",
                ui: "",
              });
            }
            try {
              const docRef = addDoc(collection(db, "Tripss"), {
                EndPoint: car.EndPoint,
                Hotline: car.Hotline,
                ID_Car: car.ID_Car,
                ID_Garage: car.ID_Garage,
                LicensePlate: car.LicensePlate,
                NameGarage: car.Namegarage,
                NameTrip: car.NameTrip,
                PakingEnd: car.PakingEnd,
                PakingStart: car.PakingStart,
                Price: car.Price,
                StartPoint: car.StartPoint,
                TypeVehicle: car.TypeVehicle,
                duration: car.duration,
                StartTime: timestamp,
                EndTime: timestampEnd,
                seat: newState,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {}
            console.log("groupLists2", groupLists);
            clearInterval(intervalId);
          } else {
            console.log(
              `Car ${car.ID_Car} ko tồn tại, tiến hành tạo bảng đầu tiên `
            );
            //só seat:
            let id = 0;
            let name = "A";
            let newState = [];
            for (var ii = 1; ii <= car.seat; ii++) {
              id++;
              newState.push({
                id: id,
                name: name + ii,
                status: "empty",
                ui: "",
              });
            }
            //endTime
            const dateEnd = car.StartTime.toDate();
            dateEnd.setHours(dateEnd.getHours() + car.duration);
            const fromDateEnd = new Date(dateEnd);
            const timestampEnd = Timestamp.fromDate(dateEnd);
            //endtime
            try {
              const docRef = addDoc(collection(db, "Tripss"), {
                EndPoint: car.EndPoint,
                Hotline: car.Hotline,
                ID_Car: car.ID_Car,
                ID_Garage: car.ID_Garage,
                LicensePlate: car.LicensePlate,
                NameGarage: car.Namegarage,
                NameTrip: car.NameTrip,
                PakingEnd: car.PakingEnd,
                PakingStart: car.PakingStart,
                Price: car.Price,
                StartPoint: car.StartPoint,
                TypeVehicle: car.TypeVehicle,
                duration: car.duration,
                StartTime: car.StartTime,
                EndTime: timestampEnd,
                seat: newState,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {}
          }
        }
      }
    }, 100);
  }, [setGroupList]);

  return <></>;
};
