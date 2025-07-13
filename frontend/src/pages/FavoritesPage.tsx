import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Skeleton, Box } from '@mui/material';
import { useFavorites } from '../hooks/useFavorites';
import { BookCard } from '../components/BookCard';

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

export const FavoritesPage = () => {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(
      favoriteIds.map((id) =>
        axios.get(`https://gutendex.com/books/${id}`).then((res) => res.data)
      )
    )
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [favoriteIds]);

  const skeletonCount = favoriteIds.length || 12;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Favorite Books
      </Typography>

      {loading ? (
        <Grid container>
          {[...Array(skeletonCount)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" height={300} />
              <Skeleton height={30} />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : books.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No favorites yet.</Typography>
        </Box>
      ) : (
        <Grid container>
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
      )}
    </Container>
  );
};
