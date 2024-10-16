
import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReviewForm from '../../components/user/ReviewForm';
import { CreateReviewDTO } from '../../types/reviews/review';
import ReviewList from '../../components/user/ReviewList';
import { useReview } from '../../components/hooks/useReview';
import { useBooks } from '../../components/hooks/useBooks';
import BookSelect from '../../components/BookSelect';
import { useAuth } from '../../components/AuthProvider';
import SeacrhInput from '../../components/Search';


const UserReviews = () => {
  const {userId} = useAuth();
  const {books} = useBooks();
  const [selectedBookId, setSelectedBookId] = useState<string>('');
  const {reviews, editingReview, createNewReview, searchReviewByTerm, deleteReviewById, updateExistingReview, startEditing, stopEditing} = useReview({
    bookId: selectedBookId,
  });

  const handleSubmit = async (id: string, reviewData: CreateReviewDTO) => {
    if (editingReview) {
      await updateExistingReview(id, reviewData);
    } else {
      await createNewReview(reviewData);
    }
    stopEditing();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Give Review
      </Typography>
      <BookSelect books={books} selectedBookId={selectedBookId} onChange={setSelectedBookId} />
      <Box sx={{ mb: 4 }}>
        <ReviewForm onSubmit={handleSubmit} editingReview={editingReview} selectedBookId={selectedBookId} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <SeacrhInput onSearch={searchReviewByTerm}/>
      <ReviewList reviews={reviews} userId={userId} isEditable={true} onDelete={deleteReviewById} onEdit={startEditing}/>
    </Container>
  );
};

export default UserReviews;
