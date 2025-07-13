import { useEffect, useState, type FC } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Container, Grid, Typography, Alert, CircularProgress } from '@mui/material'
import { BookCard } from '../components/BookCard'
import { useFavoritesContext } from '../context/FavoritesContext'


interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

export const FavoritesPage: FC = () => {
  const { favoriteIds, toggleFavorite } = useFavoritesContext()
  const [books, setBooks] = useState<Book[]>([])
  const [failedIds, setFailedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const userId = token ? jwtDecode<{ userId: string }>(token).userId : null

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const res = await axios.post<{ books: Book[], failed: string[] }>(
          `http://localhost:4000/user/${userId}/favorites`,
          { ids: favoriteIds },
          { headers: { Authorization: token } }
        )

        setBooks(res.data.books || [])
        setFailedIds(res.data.failed || [])
      } catch {
        setBooks([])
        setFailedIds(favoriteIds)
      } finally {
        setLoading(false)
      }
    }

    if (userId && favoriteIds.length > 0) {
      fetchBooks()
    } else {
      setBooks([])
    }
  }, [favoriteIds, token, userId])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Favorite Books
      </Typography>

      {loading && (
        <Grid container justifyContent="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Grid>
      )}

      {!loading && !!failedIds.length && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Failed to fetch books with the following IDs: {failedIds.join(', ')}
        </Alert>
      )}

      {!loading && (
        !books.length ? (
          <Typography>No favorites yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <BookCard
                  title={book.title}
                  authors={book.authors.map((a) => a.name).join(', ')}
                  cover={book.formats['image/jpeg']}
                  isFavorite={favoriteIds?.includes(book.id.toString())}
                  onToggleFavorite={() => toggleFavorite(book.id.toString())}
                />
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Container>
  );
};
