import { useEffect, useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { CreateReviewDTO, Review } from '../../types/reviews/review';

interface ReviewFormProps {
  onSubmit: (id: string, reviewData: CreateReviewDTO) => Promise<void>;
  editingReview: Review | null;
  selectedBookId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, editingReview, selectedBookId }) => {
  const [id, setId] = useState(editingReview ? editingReview.id : '');
  const [rating, setRating] = useState<number>(editingReview ? editingReview.rating : 1);
  const [text, setText] = useState<string>(editingReview ? editingReview.reviewText : '');
  const maxLength = 500;

  useEffect(() => {
    if (editingReview) {
      setId(editingReview.id);
      setRating(editingReview.rating);
      setText(editingReview.reviewText);
    } else {
      setId('');
      setRating(1);
      setText('');
    }
  }, [editingReview]);

  return (
    <Box component="form" onSubmit={(e) => {
      e.preventDefault();
      const review: CreateReviewDTO = {
        bookId: selectedBookId,
        rating: rating,
        reviewText: text,
        dateOfReview: new Date()
      };
      onSubmit(id, review);
    }} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit Your Review
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Typography component="legend" sx={{ mr: 2 }}>
          Rating:
        </Typography>
        <Rating
          name="star-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue || 1);
          }}
        />
      </Box>

      <TextField
        label="Review Text"
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setText(e.target.value);
          }
        }}
        fullWidth
        margin="normal"
        multiline
        required
        inputProps={{ maxLength: maxLength }} 
      />
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {text.length}/{maxLength} characters
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
