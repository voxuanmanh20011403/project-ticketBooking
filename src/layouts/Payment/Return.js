import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Return() {
  const history = useHistory();

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const vnpResponseCode = params.get('vnp_ResponseCode');

    if (vnpResponseCode === '00') {
      // Thanh toán thành công
      history.push('/payment-result/success');
    } else {
      // Thanh toán thất bại
      history.push('/payment-result/fail');
    }
  }, []);

  return null;
}

export default Return;
