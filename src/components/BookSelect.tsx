
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Book } from '../types/books/book'; 

interface BookSelectProps {
  selectedBookId: string;
  onChange: (bookId: string) => void;
  books: Book[]; 
}

const BookSelect: React.FC<BookSelectProps> = ({ selectedBookId, onChange, books }) => {
  return (
    <FormControl style={{ width: "30%" }} margin="normal">
      <InputLabel>Select Book</InputLabel>
      <Select
        value={selectedBookId}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {books?.map((book) => (
          <MenuItem key={book.id} value={book.id}>
            {book?.title} {" by "} {book?.author}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BookSelect;
