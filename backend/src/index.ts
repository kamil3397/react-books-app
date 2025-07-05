import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { AuthController } from './controllers/AuthController';
import { UsersController } from './controllers/UsersController';
import { BooksController } from './controllers/BooksController';

const run = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());


  console.log('[Mongo] Connecting to MongoDB...');
  const mongoClient = await new MongoClient(process.env.MONGO_URL!).connect();
  console.log('[Mongo] Connected');

  const database = mongoClient.db();

  const authController = new AuthController(database.collection('users'));
  const usersController = new UsersController(database.collection('users'));


  app.post('/register', (req, res) => authController.register(req, res));
  app.post('/login', (req, res) => authController.login(req, res));

  app.get('/books', (req, res) => BooksController.getBooks(req, res));
  app.post('/books/favoriteIds', BooksController.getBooksByIds);

  app.get('/favorites', (req, res) => usersController.getFavorites(req, res));
  app.post('/favorites/:bookId', (req, res) => usersController.addFavorite(req, res));
  app.delete('/favorites/:bookId', (req, res) => usersController.removeFavorite(req, res));


  app.listen(process.env.PORT, () => {
    console.log('info', `Server running on port ${process.env.PORT}`);
  });
}

run();
