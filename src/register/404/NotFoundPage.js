import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Oops! Page not found</Typography>
      <Typography variant="subtitle1">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button component={Link} to="/" variant="outlined"  style={{ marginTop: '2rem', backgroundColor: 'black' }}>
        Go to homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
