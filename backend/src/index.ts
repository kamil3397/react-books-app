import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { AuthController } from './controllers/AuthController';
import { UsersController } from './controllers/UsersController';

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

  app.get('/favorites', async(req, res) => await usersController.getFavorites(req, res));
  app.post('/favorites/:bookId', async (req, res) => await usersController.addFavorite(req, res));
  app.delete('/favorites/:bookId', async (req, res) => await usersController.removeFavorite(req, res));


  app.listen(process.env.PORT, () => {
    console.log('info', `Server running on port ${process.env.PORT}`);
  });
}

run();
