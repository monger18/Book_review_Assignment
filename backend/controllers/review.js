import express from 'express'
import { Review } from '../model/book.js'

export const getReview = async (req, res) => {
  const { bookId } = req.query
  if (!bookId) return res.status(400).json({ message: 'Book ID is required' })

  try {
    const reviews = await Review.find({ bookId })
    res.status(200).json({
      success: true,
      message: 'Review fetched',
      reviews,
    })
  } catch (err) {
    console.log('Error in fetching review')
    res.status(404).json({ message: error.message })
  }
}

export const addReview = async (req, res) => {
  const { bookId, rating, comment } = req.body
  const userId = req.user.userId
  // console.log({ userId })

  if (!bookId || !userId || !rating) {
    return res
      .status(400)
      .json({ message: 'Book ID, user ID, and rating are required' })
  }

  try {
    const newReview = new Review({ bookId, userId, rating, comment })
    await newReview.save()
    res.status(201).json({
      success: true,
      message: 'Review Added successfully',
      newReview: {
        ...newReview._doc,
      },
    })
  } catch (error) {
    console.log('Not able to add review')
    res.status(404).json({ message: error.message })
  }
}
