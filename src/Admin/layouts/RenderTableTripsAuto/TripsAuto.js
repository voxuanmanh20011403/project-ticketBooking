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
      if (now.getHours() == 11 && now.getMinutes() === 11) {
        for (let i = 0; i < listCars.length; i++) {
          const car = listCars[i];
          // Tính khoảng cách giữa 2 ngày dưới dạng số mili giây
          const diffMillis =
            car.StartTimeNext.toDate() - car.StartTime.toDate();
          // Chuyển đổi số mili giây thành số ngày
          const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));

          if (groupedData[car.ID_Car]) {
            console.log(`Car ${car.ID_Car} tồn tại `);
            console.log("diffDays", car.StartTimeNext.toDate());
            console.log("diffDays", car.StartTime.toDate());

            // XE VỀ
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
            if (
              groupedData[car.ID_Car][groupedData[car.ID_Car].length - 2]
                .StartPoint === car.StartPoint
            ) {
              const lengData =
                groupedData[car.ID_Car][groupedData[car.ID_Car].length - 2];

              const StartTime = lengData.StartTime;
              //XE ĐI
              //cộng ngày chạy
              const date = StartTime.toDate();
              // date.setDate(date.getDate() + diffDays);
              date.setHours(date.getHours() + diffHours);

              console.log("Đây là xe đi", date);
              //chuyển vào fb
              const fromDate = new Date(date);
              const timestamp = Timestamp.fromDate(date);

              //endTime
              const dateEnd = timestamp.toDate();
              dateEnd.setHours(dateEnd.getHours() + car.duration);
              const fromDateEnd = new Date(dateEnd);
              const timestampEnd = Timestamp.fromDate(dateEnd);
              //Xe đi
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
            }
            if (
              groupedData[car.ID_Car][groupedData[car.ID_Car].length - 1]
                .StartPoint != car.StartPoint
            ) {
              const lengData =
                groupedData[car.ID_Car][groupedData[car.ID_Car].length - 1];

              const StartTime = lengData.StartTime;
              //XE ĐI
              //cộng ngày chạy
              const date = StartTime.toDate();
              // date.setDate(date.getDate() + diffDays);
              date.setHours(date.getHours() + diffHours);

              console.log("Đây là xe về", date);

              //chuyển vào fb
              const fromDate = new Date(date);
              const timestamp = Timestamp.fromDate(date);

              //endTime
              const dateEnd = timestamp.toDate();
              dateEnd.setHours(dateEnd.getHours() + car.duration);
              const fromDateEnd = new Date(dateEnd);
              const timestampEnd = Timestamp.fromDate(dateEnd);
              // xe về
              try {
                const docRef = addDoc(collection(db, "Tripss"), {
                  EndPoint: car.StartPoint,
                  Hotline: car.Hotline,
                  ID_Car: car.ID_Car,
                  ID_Garage: car.ID_Garage,
                  LicensePlate: car.LicensePlate,
                  NameGarage: car.Namegarage,
                  NameTrip: car.NameTrip,
                  PakingEnd: car.PakingStart,
                  PakingStart: car.PakingEnd,
                  Price: car.Price,
                  StartPoint: car.EndPoint,
                  TypeVehicle: car.TypeVehicle,
                  duration: car.duration,
                  StartTime: timestamp,
                  EndTime: timestampEnd,
                  seat: newState,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {}
            }
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
            const timestampEnd = Timestamp.fromDate(dateEnd); // Sửa lại phương thức thành fromDate

            //endTimeTurning
            const dateEnd1 = car.TurnTime.toDate();
            dateEnd1.setHours(dateEnd1.getHours() + car.duration);
            console.log('car.duration',car.duration);
            const timestampEnd1 = Timestamp.fromDate(dateEnd1); // Sửa lại phương thức thành fromDate

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
            } catch (e) {
              console.error("Error adding document: ", e);
            }

            try {
              const docRef1 = addDoc(collection(db, "Tripss"), {
                EndPoint: car.StartPoint,
                Hotline: car.Hotline,
                ID_Car: car.ID_Car,
                ID_Garage: car.ID_Garage,
                LicensePlate: car.LicensePlate,
                NameGarage: car.Namegarage,
                NameTrip: car.NameTrip,
                PakingEnd: car.PakingStart,
                PakingStart: car.PakingEnd,
                Price: car.Price,
                StartPoint: car.EndPoint,
                TypeVehicle: car.TypeVehicle,
                duration: car.duration,
                StartTime: car.TurnTime,
                EndTime: timestampEnd1,
                seat: newState,
              });
              console.log("Document written with ID: ", docRef1.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        }
      }
    }, 100);
  }, [setGroupList]);

  return <></>;
};
