import { Alert } from '@mui/material';

const Notification = ({ message, severity }) => {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '300px', zIndex: 9999 }}>
      
      <Alert severity={severity} sx={{ mb: 2 }}>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;