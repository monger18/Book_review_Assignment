import express, { Router } from 'express'
import { addBook, getBook, getBookbyId } from '../controllers/getBook.js'
import { authMiddleware } from '../middleware/authorization.js'
import { isAdmin } from '../middleware/admin.js'

const router = express.Router()

router.get('/', getBook)

router.get('/:id', getBookbyId)

router.post('/', authMiddleware, isAdmin, addBook) // admin middleware

export default router
