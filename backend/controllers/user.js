import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../model/User.js'
import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'
import { generateCookie } from '../utils/generatecookie.js'
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
    generateCookie(res, user._id)
    res.status(200).json({
      success: true,
      message: 'Login Successfull',
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

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const updatedbody = req.body
    const updatedUser = await User.findByIdAndUpdate(userId, updatedbody, {
      new: true,
    })
    if (!updateUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.log('User not Updated')
    res.status(404).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User does not exists' })
    }
    res.status(200).json({
      success: true,
      message: 'User Found',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    console.log('User not Found')
    res.status(404).json({ message: error.message })
  }
}
