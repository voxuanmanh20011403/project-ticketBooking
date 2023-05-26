import React from 'react'
import "./PolicyTicket.css"
const PolicyTicket = () => {
  return (
    <div className='policy' id='policy'>
      <div className='policy_container'>
        <div className='head_policy'>
          <span>
          ——— Chính sách đổi trả / hủy vé ———
          </span>
        </div>
        <div className='text_polycy'>
          <p><strong>Chính sách đổi trả/ hủy vé</strong></p>
          <p>Quý khách có nhu cầu đổi hoặc hủy vé có thể thực hiện qua Website của chúng tôi hoặc vui lòng liên hệ với chúng tôi theo thông tin dưới đây:</p>
          <p>
            Hotline:  
            <span style={{ color: '#ff0000' }}>
              <strong>1900 2679 - 0904701571</strong>
            </span>
             hoặc phản hồi qua email:  
            <span style={{ color: '#0000ff' }}>
              <a href="">
                swiftride.contact@gmail.com</a>
            </span>
             để được hỗ trợ hướng dẫn.
          </p>
          <p><strong>Thời gian hủy vé:</strong></p>
          <p>– Quý khách hủy vé, đổi chuyến vui lòng báo trước 24 tiếng so với giờ khởi hành bên em hoàn 95% giá vé hiện hành </p>
          <p>– Quý khách báo sau 24 tiếng so với giờ khởi hành bên em không hoàn vé </p>
          <p>
            <strong>
              Lưu ý:
              <span style={{ color: '#ff0000' }}>Chính sách trên không áp dụng cho các dịp Lễ, Tết.</span>
            </strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PolicyTicket