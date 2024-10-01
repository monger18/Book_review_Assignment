import express from 'express'
import {
  getUser,
  registerUser,
  updateUser,
  userlogin,
} from '../controllers/user.js'
import { authMiddleware } from '../middleware/authorization.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', userlogin)

router.get('/:id', getUser)

router.put('/:id', updateUser) // add a auth middleware

export default router
