import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


import { db } from "data/firebase";
import { addDoc, collection, where, getDocs, query, getDoc, updateDoc, doc } from "firebase/firestore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Return() {
  const [returnUrl, setReturnUrl] = useState([
  ]);
  const [removeLocal, setRemoveLocal] = useState(false);
  // lấy thông tin thanh toán từ returnUrl do vnpay trả về
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const vnpResponseCode = params.get('vnp_ResponseCode');
  const amount = params.get('vnp_Amount') / 100; //tổng tiên thanh toán
  const bankCode = params.get('vnp_BankCode'); //Mã Ngân hàng thanh toán
  const bankTranNo = params.get('vnp_BankTranNo'); //Mã giao dịch tại Ngân hàng
  const cardType = params.get('vnp_CardType'); //Loại tài khoản/thẻ khách hàng sử dụng:ATM,QRCODE
  const payDate = params.get('vnp_PayDate'); // Thời gian thanh toán

  // foramt lại datetime
  const year = payDate.substr(0, 4);
  const month = payDate.substr(4, 2) - 1;
  const day = payDate.substr(6, 2);
  const hour = payDate.substr(8, 2);
  const minute = payDate.substr(10, 2);
  const second = payDate.substr(12, 2);
  const date = new Date(year, month, day, hour, minute, second);
  const formattedDateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // get db từ localStorage
  const getLocalUserDB = JSON.parse(localStorage.getItem('getLocalUserDB'));
  // console.log("getLocalUserDB: " + (getLocalUserDB));

  const timeStart = getLocalUserDB.dataBooking[0].StartTime;
  const dateS = new Date(timeStart.seconds * 1000);
  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();

  useEffect(() => {
    setReturnUrl([amount, bankCode, bankTranNo, cardType, formattedDateString, vnpResponseCode]);
    // create collection checkout 
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1 để lấy tháng hiện tại
    const year = today.getFullYear();
    if (vnpResponseCode === '00') { //checkout success
      async function addDB() {
        try {
          const docRef = await addDoc(collection(db, 'Checkout'), {
            IdTrip: getLocalUserDB.dataBooking[0].IdTrip,
            FullName: getLocalUserDB.data.firstName + ' ' + getLocalUserDB.data.lastName,
            NumberPhone: getLocalUserDB.data.phoneNumber,
            Email: getLocalUserDB.data.phoneNumber,
            NameGarage: getLocalUserDB.dataBooking[0].NameGarage,
            NameTrip: getLocalUserDB.dataBooking[0].NameTrip,
            StartTime: `${hoursS}:${minutesS}" "${dayS}/${monthS}/${yearS}`,
            PakingStart: getLocalUserDB.dataBooking[0].PakingStart,
            PakingEnd: getLocalUserDB.dataBooking[0].PakingEnd,
            TotalSeated: getLocalUserDB.dataBooking[0].totalSeat,
            ListSeated: getLocalUserDB.dataBooking[0].listSeated,
            TotalPrice: getLocalUserDB.dataBooking[0].totalPrice,
            Date: `${date}/${month}/${year}`,
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
      addDB();
      setRemoveLocal(true);
    } else {
      console.log("error")
    }
  }, [vnpResponseCode]);


  // update data trips after checkout success
  if (removeLocal === true) {
    const listSeated = getLocalUserDB.dataBooking[0].listSeated;
    const id = getLocalUserDB.dataBooking[0].id;

    const tripRef = doc(collection(db, "Trips"), id);

    const updateTrip = async () => {
      try {
        const docSnap = await getDoc(tripRef);
        const data = docSnap.data();
        const updatedSeat = data.seat.map(s => {
          if (listSeated.includes(s.name)) {
            return { ...s, status: "book" };
          }
          return s;
        });
        await updateDoc(tripRef, { seat: updatedSeat });
        console.log("Seats updated successfully!");
      } catch (e) {
        console.error("Error updating seats: ", e);
      }
    };
    updateTrip();
  }


  // clear local sau 1p
  if (removeLocal === true) {
    setTimeout(() => {
      localStorage.removeItem('getLocalUserDB');
    }, 60000);
  }
  // bắt sự kiện beforeunload thì clear storage
  window.addEventListener('beforeunload', function (e) {
    localStorage.clear();
  });

  // console.log("returnUrl: " + returnUrl);

  // 9704198526191432198 - NGUYEN VAN A  - 07/15 - 123456 

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <Grid container spacing={2}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <div className='return__card'>
                <h2>THANH TOÁN THÀNH CÔNG <CheckCircleOutlineIcon color="success" /></h2>
                <br></br>
                <h4 >Mã giao dịch <span>{returnUrl[2]}</span></h4>
                <h4>Ngân hàng thanh toán<span>{returnUrl[1]}</span></h4>
                <h4>
                  Thanh toán với<span>{returnUrl[3]}</span>
                </h4>
                <h4>Thời gian thanh toán<span> {returnUrl[4]}</span></h4>
                <h4>Tổng tiền thanh toán<span>{returnUrl[0]} VNĐ</span></h4>
              </div>

            </Item>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>

  );
}

export default Return;
