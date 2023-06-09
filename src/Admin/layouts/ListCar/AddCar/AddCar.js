import React, { useEffect, useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import { db } from "data/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { CustomTextField } from "../../../components/CustomTextField";
import "./AddCar.css";
import {
  DatePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

function AddCar(props) {
  const { activeButton, setActiveButton, data, setReload } = props;

  const [state, setstate] = useState([]);
  const [seat, setSeat] = useState(0);
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
  }, [seat]);
  //set show/hide form
  const open = true;

  // const addPost = () => {};
  const handleClose = () => {
    setActiveButton(false);
  };

  //TODO : CUSTOM FIELD THÊM NHÀ XE
  const [formData, setFormData] = useState({});
  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [disabledTextFieldValue, setDisabledTextFieldValue] = useState("");
  const [hotline, setHotline] = useState("");
  const [namegarage, setNamegarage] = useState("");
  const [duration, setDuration] = useState(0);

 
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState("");
  const [garageInfo, setGarageInfo] = useState([]);
  // Lấy danh sách ID từ bảng Garage
  useEffect(() => {
    const garagesCol = collection(db, "Garage");
    const unsubscribe = onSnapshot(garagesCol, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        const { NameGarage, ID_Garage, Hotline } = doc.data();
        data.push({
          value: doc.id,
          label: NameGarage,
          hotline: Hotline,
          ID_Garage: ID_Garage,
        });
      });
      setGarages(data);
    });
    return unsubscribe;
  }, []);
  //get Data từ Db dựa vào ID vừa lấy được ở phía select nhà xe
  useEffect(() => {
    const unsub = async () => {
      if (selectedGarage !== "") {
        const docRef = doc(db, "Garage", selectedGarage);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGarageInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
      }
    };
    unsub();
  }, [selectedGarage]);
  //Format price
  const [price, setPrice] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // xóa dấu phân cách hàng nghìn trong giá trị nhập vào
    const newValue = inputValue.replace(/,/g, "");
    // kiểm tra giá trị nhập vào có phải là số không
    if (!isNaN(newValue)) {
      // định dạng giá trị đã nhập
      const formattedValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setPrice(formattedValue);
    }
  };
  //format time
  const [selectDate, setSelectDate] = useState(dayjs());
  const [selectDate2, setSelectDate2] = useState(dayjs());
  const [selectDateTurn, setSelectDateTurn] = useState(dayjs());
  const [selectDateTurnNext, setSelectDateTurnNext] = useState(dayjs());

  const today = dayjs().startOf("day");
  const isDateDisabled = (date) => {
    return date.isBefore(today, "day");
  };
  const handleChangeDate = (date) => {
    setSelectDate(date);
  };
  const handleChangeDate2 = (date) => {
    setSelectDate2(date);
  };
  const handleChangeDate3 = (date) => {
    setSelectDateTurn(date);
  };
  const handleChangeDate4 = (date) => {
    setSelectDateTurnNext(date);
  };

  const date = new Date(selectDate);
  const timestamp = Timestamp.fromDate(date);
  const date2 = new Date(selectDate2);
  const timestamp2 = Timestamp.fromDate(date2);
  const date3 = new Date(selectDateTurn);
  const timestamp3 = Timestamp.fromDate(date3);
  const date4 = new Date(selectDateTurnNext);
  const timestamp4 = Timestamp.fromDate(date4);
  //

  useEffect(() => {
    if (garageInfo.ID_Garage) {
      setDisabledTextFieldValue(garageInfo.ID_Garage);
    }

    if (garageInfo.Hotline) {
      setHotline(garageInfo.Hotline);
    }
    if (garageInfo.NameGarage) {
      setNamegarage(garageInfo.NameGarage);
    }
  }, [garageInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingGarage = data.find((item) => item.ID_Car === formData.ID_Car);
    if (existingGarage) {
      toast.error(`ID: ${formData.ID_Car} đã tồn tại`, {
        autoClose: 1000,
      });
      return;
    }
    const formattedPrice = price.replace(/,/g, "");
    const priceNumber = parseInt(formattedPrice);
    const durationNumber = parseInt(duration);
    const dateTime1 = dayjs(selectDate);
    const dateTime2 = dayjs(selectDate2);
    const dateTime3 = dayjs(selectDateTurn);
    const dateTime4 = dayjs(selectDateTurnNext);

    if (dateTime1.isAfter(dateTime2)) {
      // alert("Ngày/Giờ 1 lớn hơn Ngày/Giờ 2");
      toast.error("Ngày xe đi tiếp theo phải lớn hơn ngày xe đi ban đầu", {
        autoClose: 1000,
      });
      return;
    }
    if (dateTime3.isAfter(dateTime4)) {
      // alert("Ngày/Giờ 1 lớn hơn Ngày/Giờ 2");
      toast.error("Ngày xe về tiếp theo phải lớn hơn ngày xe về", {
        autoClose: 1000,
      });
      return;
    }
    if (dateTime1.isAfter(dateTime3)) {
      // alert("Ngày/Giờ 1 lớn hơn Ngày/Giờ 2");
      toast.error("Ngày đăng kí xe đi phải trước ngày ngày đăng kí xe về", {
        autoClose: 1000,
      });
      return;
    }
    if (dateTime1.isAfter(dateTime3)) {
      // alert("Ngày/Giờ 1 lớn hơn Ngày/Giờ 2");
      toast.error("Ngày đăng kí xe đi phải trước ngày ngày đăng kí xe về", {
        autoClose: 1000,
      });
      return;
    }
    //Xe về xuất phát > xe đi + thời gian đi

    try {
      const docRef = await addDoc(collection(db, "ListCar"), {
        ...formData,
        Price: priceNumber,
        StartTime: timestamp,
        StartTimeNext: timestamp2,
        ID_Garage: disabledTextFieldValue,
        Hotline: hotline,
        Namegarage: namegarage,
        seat: seat,
        NameTrip: formData.StartPoint + "-" + formData.EndPoint,
        TypeVehicle: `Xe giường nằm ${seat} chỗ`,
        duration: durationNumber,
        TurnTime: timestamp3,
        TurnTimeNext: timestamp4,
      });
      toast.success(`Thêm thành công!`, {
        autoClose: 1000,
      });
      console.log("Document written with ID: ", docRef.id);
      //start
      // console.log(`Car ${car.ID_Car} ko tồn tại, tiến hành tạo bảng đầu tiên `);

      //end
      // location.reload();
     
    } catch (e) {}
    // só seat:
    let id = 0;
    let name = "A";
    let newState = [];
    for (var ii = 1; ii <= seat; ii++) {
      id++;
      newState.push({
        id: id,
        name: name + ii,
        status: "empty",
        ui: "",
      });
    }
    console.log("date3", date3);
    // endTime
    const dateEnd = timestamp.toDate();
    dateEnd.setHours(dateEnd.getHours() + durationNumber);
    const timestampEnd = Timestamp.fromDate(dateEnd); // Sửa lại phương thức thành fromDate

    //endTimeTurning
    const dateEnd1 = timestamp3.toDate();
    dateEnd1.setHours(dateEnd1.getHours() + durationNumber);
    const timestampEnd1 = Timestamp.fromDate(dateEnd1); // Sửa lại phương thức thành fromDate

    try {
      const docRef = addDoc(collection(db, "Tripss"), {
        EndPoint: formData.EndPoint,
        Hotline: hotline,
        ID_Car: formData.ID_Car,
        ID_Garage: disabledTextFieldValue,
        LicensePlate: formData.LicensePlate,
        NameGarage: namegarage,
        NameTrip: formData.StartPoint + "-" + formData.EndPoint,
        PakingEnd: formData.PakingEnd,
        PakingStart: formData.PakingStart,
        Price: priceNumber,
        StartPoint: formData.StartPoint,
        TypeVehicle: `Xe giường nằm ${seat} chỗ`,
        duration: durationNumber,
        StartTime: timestamp,
        EndTime: timestampEnd,
        seat: newState,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    try {
      const docRef1 = addDoc(collection(db, "Tripss"), {
        EndPoint: formData.StartPoint,
        Hotline: hotline,
        ID_Car: formData.ID_Car,
        ID_Garage: disabledTextFieldValue,
        LicensePlate: formData.LicensePlate,
        NameGarage: namegarage,
        NameTrip: formData.EndPoint + "-" + formData.StartPoint,
        PakingEnd: formData.PakingEnd,
        PakingStart: formData.PakingStart,
        Price: priceNumber,
        StartPoint: formData.EndPoint,
        TypeVehicle: `Xe giường nằm ${seat} chỗ`,
        duration: durationNumber,
        StartTime: timestamp3,
        EndTime: timestampEnd1,
        seat: newState,
      });
      console.log("Document written with ID: ", docRef1.id);
      setActiveButton(false);
      setReload((pre) => !pre);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <DashboardLayout>
      <div className="addpost">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Paper className="paper" elevation={4}>
              <div>
                <div className="modalHeading">
                  <Typography>Thêm xe </Typography>
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                      <FormControl className="Garage RenderFromGarage">
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: "NameGarage",
                            id: "uncontrolled-native",
                          }}
                          onChange={(e) => setSelectedGarage(e.target.value)}
                          value={selectedGarage}
                        >
                          {garages.map((item) => {
                            return (
                              <option
                                className="selectGarage"
                                value={item.value}
                              >
                                {item.label}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="ID Garage"
                        defaultValue="ID Garage"
                        variant="outlined"
                        name="ID_Garage"
                        value={garageInfo.ID_Garage}
                        onChange={handleChangeValue}
                        placeholder="ID Nhà xe"
                        className="RenderFromGarage Garage"
                      />
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Hotline"
                        defaultValue="Hotline"
                        variant="outlined"
                        name="Hotline"
                        value={garageInfo.Hotline}
                        placeholder="Hotline"
                        className="RenderFromGarage Garage"
                      />
                      <CustomTextField
                        label="ID Xe"
                        name="ID_Car"
                        value={formData.ID_Car}
                        onChange={handleChangeValue}
                        placeholder="Điểm ID Xe"
                        className="Garage RenderFromGarage"
                      />
                      <CustomTextField
                        label="Bến xe xuất phát "
                        name="PakingStart"
                        value={formData.PakingStart}
                        onChange={handleChangeValue}
                        placeholder="Điểm đi"
                        className="Garage RenderFromGarage"
                      />
                      <CustomTextField
                        label="Bến xe kết thúc"
                        name="PakingEnd"
                        value={formData.PakingEnd}
                        onChange={handleChangeValue}
                        placeholder="Bến xe kết thúc"
                        className="Garage RenderFromGarage"
                      />
                      <CustomTextField
                        label="Điểm đi "
                        name="StartPoint"
                        value={formData.StartPoint}
                        onChange={handleChangeValue}
                        placeholder="Điểm đi"
                        className="Garage RenderFromGarage"
                      />
                      <CustomTextField
                        label="Điểm đến "
                        name="EndPoint"
                        value={formData.EndPoint}
                        onChange={handleChangeValue}
                        placeholder="Điểm đến"
                        className="Garage RenderFromGarage"
                      />

                      <FormControl className="Garage RenderFromGarage">
                        <InputLabel
                          style={{ backgroundColor: "white" }}
                          id="demo-simple-select-required-label"
                          name="Price"
                          value={formData.Price}
                          onChange={handleChangeValue}
                          type="number"
                        >
                          Giá vé
                        </InputLabel>
                        <OutlinedInput
                          value={price}
                          onChange={handleInputChange}
                          placeholder="Giá vé"
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment
                              style={{ fontSize: "inherit" }}
                              position="end"
                            >
                              vnd
                            </InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                      <CustomTextField
                        label="Biển số"
                        name="LicensePlate"
                        value={formData.LicensePlate}
                        onChange={handleChangeValue}
                        placeholder="Biển số"
                        className="Garage RenderFromGarage"
                      />
                      <FormControl
                        className="Garage RenderFromGarage"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-required-label">
                          Số ghế
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-required-label"
                          id="demo-simple-select-required"
                          className="Type  "
                          label="Age *"
                          defaultValue={20}
                          name="Seat"
                          value={seat}
                          // onChange={handleChangeValue}
                          onChange={(e) => setSeat(e.target.value)}
                        >
                          <MenuItem value={20}>Xe giường nằm 20 chỗ </MenuItem>
                          <MenuItem value={36}>Xe giường nằm 36 chỗ</MenuItem>
                          <MenuItem value={40}>Xe giường nằm 40 chỗ</MenuItem>
                        </Select>
                      </FormControl>
                      <CustomTextField
                        label="Thời gian hành trình"
                        name="duration"
                        value={formData.duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Thời gian hành trình"
                      />
                      <h6>
                        Thời gian đăng kí xe đi đầu tiên - xe đi tiếp theo
                      </h6>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          value={selectDate}
                          onChange={handleChangeDate}
                          shouldDisableDate={isDateDisabled}
                          className="Garage datapicker RenderFromGarage "
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          value={selectDate2}
                          onChange={handleChangeDate2}
                          shouldDisableDate={isDateDisabled}
                          className="Garage datapicker RenderFromGarage "
                        />
                      </LocalizationProvider>
                      <h6>
                        Thời gian đăng kí xe về đầu tiên - xe về tiếp theo{" "}
                      </h6>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          value={selectDateTurn}
                          onChange={handleChangeDate3}
                          shouldDisableDate={isDateDisabled}
                          className="Garage datapicker RenderFromGarage "
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                          value={selectDateTurnNext}
                          onChange={handleChangeDate4}
                          shouldDisableDate={isDateDisabled}
                          className="Garage datapicker RenderFromGarage "
                        />
                      </LocalizationProvider>
                      <Button
                        variant="contained"
                        className="modal__footer11"
                        color="primary"
                        type="submit"
                      >
                        Thêm mới xe
                      </Button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </Paper>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default AddCar;
