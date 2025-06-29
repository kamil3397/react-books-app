import { Request, Response } from 'express'
import { MongoClient } from 'mongodb'

export const createBook = async (req: Request, res: Response, db: MongoClient['db']) => {
  const booksCollection = db('booksdb').collection('books')
  const newBook = req.body

  if (!newBook.title || !newBook.authors) {
    return res.status(400).json({ message: 'Missing title or authors' })
  }

  try {
    const result = await booksCollection.insertOne(newBook)
    res.status(201).json({
      message: 'Book saved',
      bookId: result.insertedId,
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to save book', error: (err as Error).message })
  }
}
