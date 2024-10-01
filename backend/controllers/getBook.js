import express from 'express'
import { Book } from '../model/book.js'

export const getBook = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10))

    const skip = (page - 1) * limit

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count of books
    const total = await Book.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(total / limit)

    // Prepare pagination metadata
    const paginationMeta = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: total,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }

    res.json({
      books,
      pagination: paginationMeta,
    })
  } catch (err) {
    console.error('Error retrieving books:', err)
    res.status(500).json({ error: 'Error retrieving books' })
  }
}

export const getBookbyId = async (req, res) => {
  const bookId = req.params.id
  try {
    const book = await Book.findById(bookId)
    if (!book) {
      res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (error) {
    console.log('Error in getting book by id')
    res.status(404).json({ message: error.message })
  }
}

export const addBook = async (req, res) => {
  const { title, author, publishedDate } = req.body
  try {
    if (!title || !author || !publishedDate) {
      res.status(404).json('Title, Author and publishDate is required')
    }
    const alreadytitle = await Book.findOne({ title })
    if (alreadytitle) {
      return res.status(400).json({
        message: 'Book with this title already exists',
      })
    }
    const newBook = new Book({ title, author, publishedDate })
    await newBook.save()
    res.status(200).json({
      success: true,
      message: 'Book uploaded successfully',
      newBook: {
        ...newBook._doc,
      },
    })
  } catch (error) {
    console.log('Error in publishing new Book', error)
    res.status(404).json({ message: error.message })
  }
}
