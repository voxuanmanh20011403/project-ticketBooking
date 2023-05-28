import React from 'react';
import './FooterBooking.css'
const BodyFooter = () => {
  const about = [
    {
      title: 'Tuyến Đường',
      items: [
        'Xe đi Đà Nẵng từ Sài Gòn',
        'Xe đi Huế từ Sài Gòn',
        'Xe đi Đà Nắng từ Hà Nội',
        'Xe đi Huế từ Hà Nội'
      ]
    },
    {
      title: 'Xe Limousine',
      items: [
        'Xe Limousine đi Đà Nẵng từ Huế',
        'Xe Limousine đi Huế từ Đà Nẵng',
        'Xe Limousine đi Đà Nẵng từ Sài Gòn',
        'Xe Limousine đi Huế từ Sài Gòn',
      ]
    },
    {
      title: 'Bến Xe',
      items: [
        'Bến Xe Trung Tâm Đà Nẵng',
        'Bến Xe Phía Nam Huế',
        'Bến Xe Phương Trang',
        'Bến Xe Mỹ Đình',
      ]
    },
    {
      title: 'Nhà Xe',
      items: [
        'Xe Phương Trang',
        'Xe Hoàng Long',
        'Xe Minh Đức',
        'Xe Hoàng Hải',
      ]
    },
  ];

  return (
    <div className='body__footerbooking'>
      <div className='footer__booking'>
        {about.map((section, index) => (
          <div key={index}>
            <h4 className='about__Booking'style={{ marginBottom: '1rem', marginRight:'5rem'}}>{section.title}</h4>
            <ul className='about__listBooking'>
              {section.items.map((item, indexItem) => (
                <li key={indexItem}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyFooter;
