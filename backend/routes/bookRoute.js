import express, { Router } from 'express'
import { addBook, getBook, getBookbyId } from '../controllers/getBook.js'

const router = express.Router()

router.get('/', getBook)

router.get('/:id', getBookbyId)

router.post('/', addBook) // admin middleware

export default router
