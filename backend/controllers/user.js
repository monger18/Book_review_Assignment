import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../model/User.js'
import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'
configDotenv()

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body
    if (!username || !email || !password) {
      return res
        .status(404)
        .json({ message: 'username, email and password field is required' })
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(404).json({ message: 'username or already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newuser = new User({
      username,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user',
    })
    await newuser.save()
    res.status(200).json({
      success: true,
      message: 'User registered successfully ',
      newuser: {
        ...newuser._doc,
        password: undefined,
      },
    })
  } catch (error) {
    console.log('Error in registring User')
    res.status(404).json({ message: error.message })
  }
}

export const userlogin = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res
        .status(404)
        .json({ message: 'username and password is required' })
    }
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ message: 'Invalid Credentials' })
    }
    const ispassword = await bcrypt.compare(password, user.password)
    if (!ispassword) {
      return res.status(404).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.status(200).json({
      success: true,
      message: 'Login Successfull',
      token,
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    console.error('Error during login:')
    res.status(404).json({ message: error.message })
  }
}
