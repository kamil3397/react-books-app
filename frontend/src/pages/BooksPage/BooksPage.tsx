import { useEffect, useState } from 'react';
import { Container, Grid, Skeleton, TextField, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { BookCard } from '../../components/BookCard';
import { useFavorites } from '../../hooks/useFavorites';

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

type UserLanguage = { preferredLanguage?: string };

export const BooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchBooks = async () => {
      try {
        const decoded = jwtDecode<UserLanguage>(token);
        const preferredLang = decoded.preferredLanguage || 'en';

        setLoading(true);

        const res = await axios.get('https://gutendex.com/books', {
          params: { search, languages: preferredLang, page },
        });

        setBooks(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 32));
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, page, navigate]);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const skeletonCount = books.length > 0 ? books.length : 12;

  return (
    <Container>
      <Typography variant="h4">
        Browse Books
      </Typography>

      <TextField
        label="Search books"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <Grid container>
        {loading
          ? [...new Array(skeletonCount)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" height={300} />
              <Skeleton height={30} />
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

      {!loading && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
          <Button
            disabled={page === 1}
            onClick={handlePrev}
            sx={{
              color: page === 1 ? 'text.disabled' : 'primary.main',
              pointerEvents: page === 1 ? 'none' : 'auto',
            }}
          >
            Previous
          </Button>

          <Typography color="text.primary">
            Page {page} of {totalPages}
          </Typography>

          <Button
            disabled={page === totalPages}
            onClick={handleNext}
            sx={{
              color: page === totalPages ? 'text.disabled' : 'primary.main',
              pointerEvents: page === totalPages ? 'none' : 'auto',
            }}
          >
            Next
          </Button>
        </Box>

      )}
    </Container>
  );
};
