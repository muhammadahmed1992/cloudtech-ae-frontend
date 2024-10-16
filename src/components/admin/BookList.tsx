import React from 'react';
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import {Book} from "../../types/books/book";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.id}>
          <Paper style={{width: '100%', display:'flex', flexDirection: 'row', padding: '10px'}}>
            <ListItemText primary={book.title} secondary={`${book.author} - ${book.publicationDate}`} />
              <Button onClick={() => onEdit(book)} color="primary" variant="outlined" size="small" style={{ marginTop: '10px', marginBottom: '10px' }}>
                Edit
              </Button>
              <Button onClick={() => onDelete(book.id)} color="secondary" variant="outlined" size="small" style={{ marginTop: '10px', marginBottom: '10px' }}>
                Delete
              </Button>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;
