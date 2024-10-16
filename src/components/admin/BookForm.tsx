import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid2 } from '@mui/material';
import { Book, BookDto } from "../../types/books/book";

interface BookFormProps {
  onSubmit: (id: string, bookData: BookDto) => void;
  editingBook: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, editingBook }) => {
  const [id, setId] = useState(editingBook ? editingBook.id : '')
  const [title, setTitle] = useState(editingBook ? editingBook.title : '');
  const [author, setAuthor] = useState(editingBook ? editingBook.author : '');
  const [publicationDate, setPublicationDate] = useState(editingBook ? editingBook.publicationDate : '');
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (editingBook) {
      setId(editingBook.id);
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setPublicationDate(editingBook.publicationDate);
      setCover(null);
    } else {
      setId('');
      setTitle('');
      setAuthor('');
      setPublicationDate('');
      setCover(null);
    }
  }, [editingBook]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const book: BookDto = { title, author, publicationDate, bookCover: cover ? URL.createObjectURL(cover).toString() : null };
      onSubmit(id, book);
    }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} justifyContent={'center'} alignContent={'center'}>
          <input
            accept="image/*"
            id="file-upload"
            type="file"
            style={{ display: 'none' }} 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCover(e.target.files[0]); 
              }
            }}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              fullWidth
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
              component="span" 
            >
              {cover ? cover.name : 'Choose File'}
            </Button>
          </label>
        </Grid2>
      </Grid2>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        {editingBook ? 'Update' : 'Submit'}
      </Button>
    </form>
  );
};

export default BookForm;
