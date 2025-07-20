import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios from 'axios'

interface FavoritesContextType {
  favoriteIds: string[]
  toggleFavorite: (bookId: string) => Promise<void>
  loading: boolean
  error: string | null
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userRes = await axios.get<{ userId: string }>('http://localhost:4000/user', {
          headers: { Authorization: token },
        })

        const userId = userRes.data.userId

        const favRes = await axios.get<string[]>(
          `http://localhost:4000/user/${userId}/favorites`,
          { headers: { Authorization: token } }
        )

        setFavoriteIds(favRes.data)
      } catch {
        setFavoriteIds([])
        setError('Failed to load favorite books')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [token])

  const toggleFavorite = async (bookId: string) => {
    const isAlreadyFavorite = favoriteIds.includes(bookId)
    const config = { headers: { Authorization: token } }

    try {
      if (isAlreadyFavorite) {
        await axios.delete(`http://localhost:4000/favorites/${bookId}`, config)
      } else {
        await axios.post(`http://localhost:4000/favorites/${bookId}`, {}, config)
      }

      setFavoriteIds((prev) =>
        isAlreadyFavorite
          ? prev.filter((id) => id !== bookId)
          : [...prev, bookId]
      )
    } catch {
      setError('Failed to update favorite books')
    }
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, loading, error }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
