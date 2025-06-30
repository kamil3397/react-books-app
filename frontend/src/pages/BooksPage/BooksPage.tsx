import { useEffect, useState } from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BookCard } from './BooksPage components/BookCard';
import { useFavorites } from '../../hooks/useFavorites';

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

interface DecodedToken {
  userId: string;
  user: {
    name: string;
    email: string;
    preferredLanguage: string;
  };
  iat: number;
  exp: number;
}

export const BooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');

  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const preferredLang = decoded.user?.preferredLanguage || 'en';

      axios
        .get('https://gutendex.com/books', {
          params: {
            search,
            languages: preferredLang,
          },
        })
        .then((res) => setBooks(res.data.results))
        .catch(() => setBooks([]));
    } catch {
      navigate('/login');
    }
  }, [search, navigate]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Books
      </Typography>

      <TextField
        label="Search books"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard
              title={book.title}
              authors={book.authors.map((a) => a.name).join(', ')}
              cover={book.formats['image/jpeg']}
              isFavorite={favoriteIds.includes(book.id.toString())}
              onToggleFavorite={() => toggleFavorite(book.id.toString())}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
