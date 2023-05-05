import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { db } from "data/firebase";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function TestAddCar() {
  const [state, setstate] = useState([]);
  const [seat, setSeat] = useState(0);
  const [formData, setFormData] = useState({});
  const [type, settype] = useState(["Giường nằm", "Xe ghế"]);
  // const [nameGarage, d] = useState(['Phương Trang', 'Thành Bười', 'Hoàng trung'])
  const [noidi, setNoidi] = useState(["Hà nội", "Quảng Bình"]);

  useEffect(() => {
    let id = 0;
    let name = "A";
    let newState = [];
    for (var i = 1; i <= seat; i++) {
      id++;
      newState.push({
        id: id,
        name: name + i,
        status: "empty",
        ui: "",
      });
    }
    setstate(newState);
    console.log(state);
  }, [seat]);

  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(state);
    try {
      const docRef = await addDoc(collection(db, "Trips"), {
        ...formData,
        seat: state.map((seat) => {
          return {
            id: seat.id,
            name: seat.name,
            status: "empty",
            ui: "",
          };
        }),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {}
  };
  const [selectedTime, handleTimeChange] = useState(new Date());
  return (
    <DashboardLayout>
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset>
            <TextField
              name="EndPoint"
              value={formData.EndPoint}
              onChange={handleChangeValue}
              placeholder="EndPoint"
            />

            <TextField
              name="ID_Car"
              value={formData.ID_Car}
              onChange={handleChangeValue}
              placeholder="ID_Car"
            />
            <TextField
              name="ID_Garage"
              value={formData.ID_Garage}
              onChange={handleChangeValue}
              placeholder="ID_Garage"
            />

            <TextField
              name="NameGarage"
              value={formData.NameGarage}
              onChange={handleChangeValue}
              placeholder="NameGarage"
            />

            <TextField
              name="Price"
              value={formData.Price}
              onChange={handleChangeValue}
              placeholder="Price"
            />
            <TextField
              name="StartPoint"
              value={formData.StartPoint}
              onChange={handleChangeValue}
              placeholder="StartPoint"
            />
            <TextField
              name="Hotline"
              value={formData.Hotline}
              onChange={handleChangeValue}
              placeholder="Hotline"
            />

            <TextField
              name="TypeVehicle"
              value={formData.TypeVehicle}
              onChange={handleChangeValue}
              placeholder="TypeVehicle"
            />

            <TextField
              name="duration"
              value={formData.duration}
              onChange={handleChangeValue}
              placeholder="duration"
            />
            <TextField
              onChange={(e) => setSeat(e.target.value)}
              placeholder="number seat"
            />
            {/* <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Loại xe
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'NameGarage',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeValue}
                            value={formData.NameGarage}
                        >
                            {type.map((item) => {
                                return (<option value={item}>{item}</option>)

                            })}




                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Nơi đi
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'NameGarage',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeValue}
                            value={formData.NameGarage}
                        >
                            {type.map((item) => {
                                return (<option value={item}>{item}</option>)

                            })}




                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Nơi đến
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'NameGarage',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeValue}
                            value={formData.noidi}
                        >
                            {noidi.map((item) => {
                                return (<option value={item}>{item}</option>)

                            })}




                        </NativeSelect>
                    </FormControl>  */}
            <input
              type="submit"
              className="btn btn-success"
              defaultValue="Thêm vào"
            />
          </fieldset>
        </form>
      </div>
    </DashboardLayout>
  );
}
