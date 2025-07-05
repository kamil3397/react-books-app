import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = localStorage.getItem('token')

  useEffect(() => {

    const fetchFavorites = async () => {
      await axios
        .get<string[]>('http://localhost:4000/favorites', {
          headers: { Authorization: token },
        })
        .then((res) => {
          setFavoriteIds(res.data)
          setError(null)
        })
        .catch(() => {
          setFavoriteIds([])
          setError('Failed to load favorite books')
        })
        .finally(() => setLoading(false))
    }

    fetchFavorites()
  }, [])

  const toggleFavorite = async (bookId: string) => {

  const isAlreadyFavorite = favoriteIds.includes(bookId)
  const config = { headers: { Authorization: token } }

  const updateServer = isAlreadyFavorite
    ? () => axios.delete(`http://localhost:4000/favorites/${bookId}`, config)
    : () => axios.post(`http://localhost:4000/favorites/${bookId}`, {}, config)

  const updateLocalState = (prev: string[]) =>
    isAlreadyFavorite
      ? prev.filter((id) => id !== bookId)
      : [...prev, bookId]

  await updateServer()
    .then(() => {
      setFavoriteIds(updateLocalState)
    })
    .catch(() => {
      setError('Failed to update favorite books')
    })
}

  return { favoriteIds, toggleFavorite, loading, error }
}
