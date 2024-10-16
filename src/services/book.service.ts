import api from "./api";
import { BookDto, Book } from "../types/books/book";

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const createBook = async (newBook: BookDto) => {
  try {
    const response = await api.post('/books', newBook);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id: string, updatedBook: BookDto) => {
  try {
    const response = await api.put(`/books/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
