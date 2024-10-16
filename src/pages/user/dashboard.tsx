
import ReviewList from '../../components/user/ReviewList';
import {Typography, Container } from '@mui/material';
import { useReview } from '../../components/hooks/useReview';
import { useAuth } from '../../components/AuthProvider';

const Dashboard = () => {
  const {userId} = useAuth();
  const {reviews} = useReview({
    fetchByUserId: true
  });

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Book Reviews
      </Typography>
      <ReviewList reviews={reviews} userId={userId} />
    </Container>
  );
};

export default Dashboard;
