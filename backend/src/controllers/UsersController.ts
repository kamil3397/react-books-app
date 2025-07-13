import { Request, Response } from 'express'
import { Collection } from 'mongodb'
import jwt from 'jsonwebtoken'

interface User {
  _id: string
  name: string
  email: string
  password: string
  preferredLanguage: string
  favorites: string[]
}

export class UsersController {
  constructor(private usersCollection: Collection<User>) { }

  private extractUserId(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    try {
      const decoded = jwt.verify(authHeader, process.env.JWT_SECRET!) as { userId: string };
      return decoded.userId;
    } catch {
      return null;
    }
  }
  async getUserById(req: Request, res: Response) {
    const userId = this.extractUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  async getFavoritesByUserId(req: Request, res: Response) {
  const { userId } = req.params;
  const tokenUserId = this.extractUserId(req);

  if (!tokenUserId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const user = await this.usersCollection.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get favorites', error: (err as Error).message });
  }
}

  async addFavorite(req: Request, res: Response) {
    const userId = this.extractUserId(req);
    const { bookId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      await this.usersCollection.updateOne(
        { _id: userId },
        { $addToSet: { favorites: bookId } }
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add favorite', error: (err as Error).message });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    const userId = this.extractUserId(req);
    const { bookId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      await this.usersCollection.updateOne(
        { _id: userId },
        { $pull: { favorites: bookId } }
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ message: 'Failed to remove favorite', error: (err as Error).message });
    }
  }
}
