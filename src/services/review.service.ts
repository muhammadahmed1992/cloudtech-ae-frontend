import api from './api'; 
import { CreateReviewDTO, ReviewResponse } from '../types/reviews/review';

export const fetchReviews = async (bookId: string): Promise<ReviewResponse[]> => {
  try {
    const response = await api.get(`/reviews/${bookId}/book`);
    return response.data;
  } catch (error) {
    return []; 
  }
};

export const fetchReviewsByUserId = async (): Promise<ReviewResponse[]> => {
  try {
    const response = await api.get(`/reviews/user/books`);
    return response.data;
  } catch (error) {
    return []; 
  }
};

export const createReview = async (data: CreateReviewDTO) => {
  try {
    const response = await api.post('/reviews', data);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const updateReview = async (id: string, data: CreateReviewDTO) => {
  try {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const searchReview = async (term: string | number): Promise<ReviewResponse[]> => {
  try {
    const response = await api.get(`/reviews/search?term=${term}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const deleteReview = async (id: string) => {
  try {
    await api.delete(`/reviews/${id}`);
  } catch (error) {
    throw error; 
  }
};
