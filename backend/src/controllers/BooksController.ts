import axios from 'axios';
import { Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

export class BooksController {
  static async getBooks(req: Request, res: Response) {
    try {
      const { search = '', languages = 'en' } = req.query;
      const response = await axios.get('https://gutendex.com/books', {
        params: { search, languages },
      });
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch books.' });
    }
  }
  static async getBooksByIds(req: Request, res: Response) {
    try {
      const { ids }: { ids: string[] } = req.body;

      const results = await Promise.allSettled(
        ids.map((id) =>
          axios.get<Book>(`https://gutendex.com/books/${id}`)
        )
      );

      const books: Book[] = [];
      const failed: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          books.push(result.value.data);
        } else {
          failed.push(ids[index]);
        }
      });

      res.json({ books, failed });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch books.' });
    }
  }
}
