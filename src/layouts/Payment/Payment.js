import React, { useState } from 'react'
import { VNPay } from 'vn-payments';

const Payment = () => {
    // console.log(VNPay);
    const [formData, setFormData] = useState({
        amount: '',
        orderDescription: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kết nối với VNPay API để tạo url thanh toán
        const vnpayApi = new VNPay({
          paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
          merchant: 'NCSJ1PFR',
          secureSecret: 'CNXPDIGDJKIRXLMCMDERNNYJTVXUZRUN',
        });
    
        const checkoutData = {
          amount: parseInt(formData.amount),
          orderId: "240000",
          orderInfo : formData.orderDescription,
          orderType: '240000',
          transactionId: '20170829153052',
          returnUrl: 'http://localhost:3000/return', // Đường dẫn trả về khi thanh toán thành công
          clientIp:"192.168.1.1",
          
        };
    
        const checkoutUrl = await vnpayApi.buildCheckoutUrl(checkoutData);
    
        // Chuyển hướng đến trang thanh toán của VNPay
        window.location.href = checkoutUrl;
      };
    
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Số tiền:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="orderDescription">Mô tả:</label>
          <input
            type="text"
            name="orderDescription"
            value={formData.orderDescription}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Thanh toán</button>
      </form>
    )
}

export default Payment