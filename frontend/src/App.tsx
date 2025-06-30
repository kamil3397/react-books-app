import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Auth/Register';
import { Login } from './pages/Auth/Login';
import { BooksPage } from './pages/BooksPage/BooksPage';
import { Navbar } from './components/Navbar';
import { FavoritesPage } from './pages/FavoritesPage';

const App = () => (
  <>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/books" element={<BooksPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
  </Routes>
  </>
);

export default App;
