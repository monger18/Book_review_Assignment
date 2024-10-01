import express from 'express'
import { addReview, getReview } from '../controllers/review.js'
import { authMiddleware } from '../middleware/authorization.js'

const router = express.Router()

router.get('/', getReview)
router.post('/', authMiddleware, addReview) // add auth middleware

export default router
