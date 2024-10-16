import { BookDto } from "../books/book";

export interface Review {
    id: string;
    bookId: string;
    userId: string;
    rating: number;
    reviewText: string;
    dateOfReview: Date;
  }

  export interface ReviewResponse {
    id: string;
    bookId: string;
    book: BookDto,
    user: {
      name: string
    }
    userId: number;
    rating: number;
    reviewText: string;
    dateOfReview: Date;
  }
  export interface CreateReviewDTO {
    bookId: string;
    rating: number;
    reviewText: string;
    dateOfReview: Date;
  }
  

 
  