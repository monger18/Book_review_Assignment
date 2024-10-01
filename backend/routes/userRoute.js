import express from 'express'
import { registerUser, userlogin } from '../controllers/user.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', userlogin)

//router.get('/:id', getUser)

//router.put('/:id', updateUser)

export default router
