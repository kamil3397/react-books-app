import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  preferredLanguage: string;
  favorites: string[];
}

export class AuthController {
  constructor(private usersCollection: Collection<UserType>) { }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, preferredLanguage } = req.body;

      if (!name || !email || !password || !preferredLanguage) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const existingUser = await this.usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: UserType = {
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        preferredLanguage,
        favorites: [],
      };

      await this.usersCollection.insertOne(newUser);

      return res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.usersCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          user: {
            name: user.name,
            email: user.email,
            preferredLanguage: user.preferredLanguage,
          },
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        accessToken: token,
        userId: user._id,
        user: {
          name: user.name,
          email: user.email,
          preferredLanguage: user.preferredLanguage,
          favorites: user.favorites,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
