import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import BookForm from '../../components/admin/BookForm';
import BookList from '../../components/admin/BookList';
import { useBooks } from '../../components/hooks/useBooks';
import { BookDto } from "../../types/books/book";

const AdminBooks: React.FC = () => {
  const { books, editingBook, createNewBook, updateExistingBook, deleteBookById, startEditing, stopEditing } = useBooks();

  const handleSubmit = async (id: string, bookData: BookDto) => {
    if (editingBook) {
      await updateExistingBook(id, bookData);
    } else {
      await createNewBook(bookData);
    }
    stopEditing();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Books
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <BookForm onSubmit={handleSubmit} editingBook={editingBook} />
      </Paper>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <BookList books={books} onEdit={startEditing} onDelete={deleteBookById} />
      </Paper>
    </Container>
  );
};

export default AdminBooks;
