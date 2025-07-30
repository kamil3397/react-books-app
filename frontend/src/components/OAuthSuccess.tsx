import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const OAuthSuccess = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuthContext()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      login(token)
      navigate('/books')
    }
  }, [params, login, navigate])

  return <div>Logging in with Google...</div>
}
