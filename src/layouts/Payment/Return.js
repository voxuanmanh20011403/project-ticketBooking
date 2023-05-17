import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import emailjs from '@emailjs/browser';
import { db } from "data/firebase";
import { addDoc, collection, where, getDocs, query, getDoc, updateDoc, doc ,Timestamp} from "firebase/firestore";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Return() {
  const [returnUrl, setReturnUrl] = useState([]);
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
  const getLocalAccount = JSON.parse(localStorage.getItem('account'));
  // console.log('getLocalAccount: ' + getLocalAccount)
  // console.log("getLocalUserDB: " + (getLocalUserDB));

  // foramt timestamp từ firestore
  const timeStart = getLocalUserDB.dataBooking[0].StartTime;
  const dateS = new Date(timeStart.seconds * 1000);
  const timestampStart = Timestamp.fromDate(dateS);

  const dayS = dateS.getDate();
  const monthS = dateS.getMonth() + 1;
  const yearS = dateS.getFullYear();
  const hoursS = dateS.getHours();
  const minutesS = dateS.getMinutes();

  const timeEnd = getLocalUserDB.dataBooking[0].EndTime;
  const dateEnd = new Date(timeEnd.seconds * 1000);
  const timestampEnd = Timestamp.fromDate(dateEnd);
  const dayEnd = dateEnd.getDate();
  const monthEnd = dateEnd.getMonth() + 1;
  const yearEnd = dateEnd.getFullYear();
  const hoursEnd = dateEnd.getHours();
  const minutesEnd = dateEnd.getMinutes();
  useEffect(() => {
    setReturnUrl([amount, bankCode, bankTranNo, cardType, formattedDateString, vnpResponseCode]);
    // create datetime hiện tại
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    if (vnpResponseCode === '00') { //checkout success
      async function addDB() {
        try {
          // create collection checkout 
          const docRef = await addDoc(collection(db, 'Checkout'), {
            // IdTrip: getLocalUserDB.dataBooking[0].IdTrip,
            idDoc: getLocalUserDB.dataBooking[0].id,
            ID_Garage: getLocalUserDB.dataBooking[0].ID_Garage,
            FullName: getLocalUserDB.data.lastName,
            NumberPhone: getLocalUserDB.data.numberPhone,
            Email: getLocalUserDB.data.email,
            NameGarage: getLocalUserDB.dataBooking[0].NameGarage,
            NameTrip: getLocalUserDB.dataBooking[0].NameTrip,
            StartTime: timestampStart,
            EndTime: timestampEnd,
            duration: getLocalUserDB.dataBooking[0].duration,
            PakingStart: getLocalUserDB.dataBooking[0].PakingStart,
            PakingEnd: getLocalUserDB.dataBooking[0].PakingEnd,
            TotalSeated: getLocalUserDB.dataBooking[0].totalSeat,
            ListSeated: getLocalUserDB.dataBooking[0].listSeated,
            TotalPrice: getLocalUserDB.dataBooking[0].totalPrice,
            DateCheckout: today,
            Status: "Success",
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
      addDB();
      //  update data trips after checkout success
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
      // Tạo mail và gửi đi
      const templateParams = {
        toEmail: getLocalUserDB.data.email,
        name: getLocalUserDB.data.lastName,
        nameTrip: getLocalUserDB.dataBooking[0].NameTrip,
        date: `Ngày ${dayS} tháng ${monthS} năm ${yearS}`,
        timeStart: `${hoursS}:${minutesS}`,
        endTime: `${hoursEnd}:${minutesEnd}" "${dayEnd}/${monthEnd}/${yearEnd}`,
        nameGarage: getLocalUserDB.dataBooking[0].NameGarage,
        from: getLocalUserDB.dataBooking[0].PakingStart,
        to: getLocalUserDB.dataBooking[0].PakingEnd,
        seats: getLocalUserDB.dataBooking[0].listSeated,
        duration: getLocalUserDB.dataBooking[0].duration,
      };
      // emailjs.send('gmail', 'template_nzsnsp7', templateParams, 'nw10q72SaDSc17UUF')
      //   .then((response) => {
      //     console.log('SUCCESS!', response.status, response.text);
      //   }, (error) => {
      //     console.log('FAILED...', error);
      //   });
      setRemoveLocal(true);
    } else {
      console.log("error")
    }
  }, [vnpResponseCode]);

  // clear local sau 1p
  // if (removeLocal === true) {
  //   setTimeout(() => {
  //     localStorage.removeItem('getLocalUserDB');
  //   }, 60000);
  // }
  // bắt sự kiện beforeunload thì clear storage
  window.addEventListener('beforeunload', function (e) {
    localStorage.clear();
  });

  // console.log("returnUrl: " + returnUrl);

  // 9704198526191432198 - NGUYEN VAN A  - 07/15 - 123456 
  let price = returnUrl[0];
  // let price = returnUrl[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  // console.log(price)
  // const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 className="title_checkout">
              THANH TOÁN THÀNH CÔNG
              <CheckCircleOutlineIcon color="success" />
            </h2>
          </Grid>
          <Grid item xs={5}>
            <Item>
              <Typography variant="h4" align="center" className="title_checkout">
                Thông tin giao dịch
              </Typography>
              <div className='return__card'>
                <h4 >Mã giao dịch: <span>{returnUrl[2]}</span></h4>
                <h4>Ngân hàng thanh toán:<span>{returnUrl[1]}</span></h4>
                <h4>
                  Thanh toán với:<span>{returnUrl[3]}</span>
                </h4>
                <h4>Thời gian thanh toán:<span> {returnUrl[4]}</span></h4>
                <h4>Tổng tiền thanh toán:<span>{price}</span></h4>
              </div>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <Typography variant="h4" align="center" className="title_checkout">
                Thông tin khách hàng
              </Typography>
              <div className='return__card'>
                <h4>Họ tên khách hàng:<span>{getLocalAccount.Name}</span></h4>
                <h4>Email:<span>{getLocalAccount.Email}</span></h4>
                <h4>Số điện thoại:<span>{getLocalAccount.NumberPhone}</span></h4>
                <h4>Tên nhà xe:<span>{getLocalUserDB.dataBooking[0].NameGarage}</span></h4>
                <h4>Chuyến đi:<span>{getLocalUserDB.dataBooking[0].NameTrip}</span></h4>
                <h4>Nơi khởi hành:<span>{getLocalUserDB.dataBooking[0].PakingStart}</span></h4>
                <h4>Nơi đến:<span>{getLocalUserDB.dataBooking[0].PakingEnd}</span></h4>
                <h4>Vị trí:<span>{getLocalUserDB.dataBooking[0].listSeated.map((name, index) => (
                  <span key={index}>
                    {name}
                    {index !== getLocalUserDB.dataBooking[0].listSeated.length - 1 && ", "}
                  </span>
                ))}</span></h4>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>

  );
}

export default Return;
