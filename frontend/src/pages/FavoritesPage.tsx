import React, { useEffect, useState, type FC } from 'react'
import axios from 'axios'
import { Container, Grid, Typography, Alert, CircularProgress } from '@mui/material'
import { useFavorites } from '../hooks/useFavorites'
import { BookCard } from './BooksPage/BooksPageComponents/BookCard'

interface Book {
  id: number
  title: string
  authors: { name: string }[]
  formats: { [key: string]: string }
}

export const FavoritesPage: FC = () => {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [books, setBooks] = useState<Book[]>([])
  const [failedIds, setFailedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

 useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await axios.post<{ books: Book[], failed: string[] }>(
        'http://localhost:4000/books/favoriteIds',
        { ids: favoriteIds }
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

  fetchBooks()
}, [favoriteIds])


  return (
    <Container sx={{ py: 4 }}>
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
  )
}
