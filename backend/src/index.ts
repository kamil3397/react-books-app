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


  app.post('/register', async (req, res) => await authController.register(req, res));
  app.post('/login', async (req, res) => await authController.login(req, res));
  app.get('/profile', async (req, res) => await usersController.getUserById(req, res));

  app.get('/books', BooksController.getBooks);
  app.post('/user/:userId/favorites', BooksController.getBooksByIds);

  app.post('/favorites/:bookId', (req, res) => usersController.addFavorite(req, res));
  app.delete('/favorites/:bookId', (req, res) => usersController.removeFavorite(req, res));



  app.get('/user/:userId/favorites', (req, res) => usersController.getFavoritesByUserId(req, res));


  app.listen(process.env.PORT, () => {
    console.log('info', `Server running on port ${process.env.PORT}`);
  });
}

run();
