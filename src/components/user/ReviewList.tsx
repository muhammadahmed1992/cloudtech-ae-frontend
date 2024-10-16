import { Review, ReviewResponse } from '../../types/reviews/review';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import { Rating } from '@mui/material';

interface ReviewListProps {
  reviews: ReviewResponse[];
  userId: string;
  isEditable?: boolean;
  onEdit?: (review: Review) => void;
  onDelete?: (id: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, userId, onDelete, onEdit, isEditable = false }) => {
  return (
    <List>
      {reviews.length === 0 ? (
        <Typography>No reviews available.</Typography>
      ) : (
        reviews.map((review) => (
          <ListItem key={review.id} sx={{ borderBottom: '1px solid #ddd', padding: '16px' }}>
            <ListItemText
            />
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', width: '100%' }}>
              {review.book && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <Typography variant="h4">
                  {`Book: ${review.book.title}`}
                </Typography>
              </Box>}
              <Box sx={{ display: 'flex', flexDirection: "column", paddingLeft: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  {"Review:"}
                </Typography>
                <Box sx={{ paddingLeft: "40px", overflow: 'visible' }}>
                  <Typography sx={{ 
                      margin: 0, 
                      wordWrap: 'break-word', 
                      whiteSpace: 'normal',
                    }}>
                    {review.reviewText}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {'Rating:'}
                  </Typography>
                  <Rating
                    name="star-rating"
                    value={review.rating}
                    readOnly
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(review.dateOfReview).toLocaleDateString()}
                  </Typography>
                  {review.user && <Typography variant="body2" color="textSecondary">
                    - {review.user.name}
                  </Typography>}
                </Box>
              </Box>
              {isEditable && review.userId === parseInt(userId, 10) && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => {

                    const reviewResponseToReview: Review = {
                      id: review.id,
                      bookId: review.bookId,
                      userId: review.userId.toString(),
                      rating: review.rating,
                      reviewText: review.reviewText,
                      dateOfReview: review.dateOfReview,
                    };
                    if (onEdit)
                      onEdit(reviewResponseToReview);
                  }} color="primary" variant="outlined" size="small">
                    Edit
                  </Button>
                  <Button onClick={() => {
                    if (onDelete)
                      onDelete(review.id)
                  }
                  } color="secondary" variant="outlined" size="small">
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ReviewList;
