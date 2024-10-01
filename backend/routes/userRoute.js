import express from 'express'
import {
  getUser,
  registerUser,
  updateUser,
  userlogin,
} from '../controllers/user.js'
import { authMiddleware } from '../middleware/authorization.js'
import { isAdmin } from '../middleware/admin.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', userlogin)

router.get('/:id', authMiddleware, isAdmin, getUser) // add a admin middleware

router.put('/:id', authMiddleware, updateUser) // add a auth middleware

export default router
