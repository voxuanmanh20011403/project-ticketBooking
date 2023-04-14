import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function Return() {
  const [returnUrl, setReturnUrl] = useState([]);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  console.log("Đây là params: " + params)


  useEffect(() => {

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
    setReturnUrl([amount, bankCode, bankTranNo, cardType, formattedDateString, vnpResponseCode]);

    // if (vnpResponseCode === '00') {
    //   console.log("Thanh toán thành công")
    // } else {
    //   console.log("Thanh toán thất bại")
    // }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <Grid container spacing={2}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <Item>
              {returnUrl[5] === '00' ? (
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
                  {/* <h4>Số ghế đã đặt<span>A1, A2</span></h4>
                <h4>Giá vé<span>1.000.000 đ</span></h4>
                <h4>Tổng số lượng ghế<span>6</span></h4>
                <hr />
                <h3>TỔNG CỘNG <span>{ }31 000 VNĐ</span></h3> */}
                </div>
              ) : <h2>ĐÃ CÓ LỖI XẢY RA. VUI LÒNG LIÊN HỆ NHÂN VIÊN ĐỂ KIỂM TRA</h2>
            }
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
