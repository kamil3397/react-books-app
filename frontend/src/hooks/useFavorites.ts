import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    axios
      .get<string[]>('http://localhost:4000/favorites', {
        headers: { Authorization: token } 
      })
      .then((res) => {
        setFavoriteIds(res.data)
      })
      .finally(() => setLoading(false))
  }, [token])

  const toggleFavorite = async (bookId: string) => {
    const exists = favoriteIds.includes(bookId)
    const url = `http://localhost:4000/favorites/${bookId}`

    try {
      if (exists) {
        await axios.delete(url, {
          headers: { Authorization: token }
        })
        setFavoriteIds((prev) => prev.filter((id) => id !== bookId))
      } else {
        await axios.post(url, {}, {
          headers: { Authorization: token } 
        })
        setFavoriteIds((prev) => [...prev, bookId])
      }
    } catch (e) {
      console.error('Failed to update favorites', e)
    }
  }

  return { favoriteIds, toggleFavorite, loading }
}
