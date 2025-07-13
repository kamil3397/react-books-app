import { createBrowserRouter } from 'react-router-dom'
import  App  from './App'
import { Home } from './pages/Home'
import { Register } from './pages/Auth/Register'
import { Login } from './pages/Auth/Login'
import { BooksPage } from './pages/BooksPage/BooksPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { ProfilePage } from './pages/ProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'books', element: <BooksPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      {path: 'profile', element: <ProfilePage/>}
    ],
  },
])
