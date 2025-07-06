import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, Typography } from '@mui/material'
import { useFavorites } from '../hooks/useFavorites'
import { BookCard } from './BooksPage/BooksPage components/BookCard'
import { useTranslation } from 'react-i18next'

interface Book {
  id: number
  title: string
  authors: { name: string }[]
  formats: { [key: string]: string }
}

export const FavoritesPage = () => {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [books, setBooks] = useState<Book[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setBooks([])
      return
    }

    Promise.all(
      favoriteIds.map((id) =>
        axios.get(`https://gutendex.com/books/${id}`).then((res) => res.data)
      )
    ).then(setBooks)
  }, [favoriteIds])

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('favoritesPage.title')}
      </Typography>

      {books.length === 0 ? (
        <Typography>{t('favoritesPage.empty')}</Typography>
      ) : (
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
      )}
    </Container>
  )
}
