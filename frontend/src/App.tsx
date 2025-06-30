import { Routes, Route } from 'react-router-dom';
import {Favorites} from './pages/Favorites';
import { Home } from './pages/Home';
import { Register } from './pages/Auth/Register';
import { Login } from './pages/Auth/Login';
import { BooksPage } from './pages/BooksPage/BooksPage';
import { Navbar } from './components/Navbar';

const App = () => (
  <>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/books" element={<BooksPage />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
  </>
);

export default App;
