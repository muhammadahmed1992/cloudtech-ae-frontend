import { useState, useEffect } from 'react';
import { ReviewResponse, CreateReviewDTO, Review } from '../../types/reviews/review';
import { fetchReviews, deleteReview, updateReview, createReview, fetchReviewsByUserId, searchReview } from '../../services/review.service';

interface useReviewProps {
    bookId?: string;
    fetchByUserId?: boolean; 
}

export const useReview = ({ bookId, fetchByUserId = false }: useReviewProps) => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const loadReviews = async () => {
    let fetchedReviews: ReviewResponse[] = [];
    try {
      if (fetchByUserId) {
          fetchedReviews = await fetchReviewsByUserId();
      } else if (bookId) {
          fetchedReviews = await fetchReviews(bookId);
      }
      setReviews([...fetchedReviews]);
    } catch (error: any) {
      alert(error.message || 'Failed to load reviews.'); 
    }
  };

  useEffect(() => {
      loadReviews();
  }, [bookId, fetchByUserId]); 

  const searchReviewByTerm = async (term: string | number) => {
    try {
      const fetchedReviews: ReviewResponse[] = await searchReview(term);
      setReviews([...fetchedReviews]);
    } catch (error: any) { 
      alert(error.message || 'Failed to search reviews.'); 
    }
  };

  const createNewReview = async (newReview: CreateReviewDTO) => {
    try {
      await createReview(newReview);
      await loadReviews();
    } catch (error: any) { 
      alert(error.message || 'Failed to create new review.'); 
    }
  };

  const deleteReviewById = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      await loadReviews();
    } catch (error: any) { 
      alert(error.message || 'Failed to delete the review.'); 
    }
  };

  const updateExistingReview = async (reviewId: string, updatedReviewData: CreateReviewDTO) => {
    if (!editingReview) return;
    try {
      const updatedReview = { ...updatedReviewData };
      await updateReview(reviewId, updatedReview);
      await loadReviews();
    } catch (error: any) {
      alert(error.message || 'Failed to update the review.'); 
    }
  };

  const startEditing = (review: Review) => setEditingReview(review);
  const stopEditing = () => setEditingReview(null);

  return {
    reviews,
    editingReview,
    searchReviewByTerm,
    createNewReview,
    deleteReviewById,
    loadReviews,
    updateExistingReview,
    startEditing,
    stopEditing,
  };
};
