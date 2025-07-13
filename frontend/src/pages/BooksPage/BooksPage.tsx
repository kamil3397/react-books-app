import { useEffect, useState } from 'react';
import { Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BookCard } from './BooksPageComponents/BookCard';
import { useFavoritesContext } from '../../context/FavoritesContext';

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

type UserLanguage = {preferredLanguage?: string}


export const BooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const { favoriteIds, toggleFavorite } = useFavoritesContext();

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    const decoded = jwtDecode<UserLanguage>(token);
    const preferredLang = decoded.preferredLanguage || 'en';

    setLoading(true);

    axios
      .get('http://localhost:4000/books', {
        params: {
          search,
          languages: preferredLang,
        },
      })
      .then((res) => setBooks(res.data.results))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
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
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" height={300} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : books.map((book) => (
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
