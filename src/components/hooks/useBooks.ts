import { useState, useEffect } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../../services/book.service';
import { Book, BookDto } from '../../types/books/book';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const loadBooks = async () => {
    try {
      const response = await fetchBooks();
      if (response) setBooks([...response]);
    } catch (error: any) { 
      alert(error.message || 'Failed to load books.'); 
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const createNewBook = async (bookData: BookDto) => {
    try {
      await createBook(bookData);
      await loadBooks();
    } catch (error: any) {
      alert(error.message || 'Failed to create new book.'); 
    }
  };

  const updateExistingBook = async (id: string, updatedBookData: BookDto) => {
    if (!editingBook) return;
    try {
      const updatedBook = { ...updatedBookData };
      await updateBook(id, updatedBook);
      await loadBooks();
    } catch (error: any) { 
      alert(error.message || 'Failed to update the book.');
    }
  };

  const deleteBookById = async (id: string) => {
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (error: any) { 
      alert(error.message || 'Failed to delete the book.'); 
    }
  };

  const startEditing = (book: Book) => setEditingBook(book);
  const stopEditing = () => setEditingBook(null);

  return {
    books,
    editingBook,
    createNewBook,
    updateExistingBook,
    deleteBookById,
    startEditing,
    stopEditing,
  };
};
