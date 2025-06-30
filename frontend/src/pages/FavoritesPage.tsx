import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFavorites } from '../hooks/useFavorites'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Book {
  id: number
  title: string
  authors: { name: string }[]
  formats: { [key: string]: string }
}

export const FavoritesPage = () => {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [books, setBooks] = useState<Book[]>([])

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
    <div>
      <h1>Favorite Books</h1>
      {books.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.authors.map((a) => a.name).join(', ')}
            <IconButton
              onClick={() => toggleFavorite(book.id.toString())}
              color="error"
              aria-label="remove from favorites"
              title="Remove from favorites"
            >
              <CloseIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  )
}
