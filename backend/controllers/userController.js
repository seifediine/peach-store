import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../models/userModel.js'

// @desc    Register a New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, user_name, email, password, phone_number } =
    req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(301)
    throw new Error('There is already a great person using this email :)')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    first_name,
    last_name,
    user_name,
    email,
    password: hashedPassword,
    phone_number,
  })

  if (user) {
    res.status(200).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      email: user.email,
      phone_number: user.phone_number,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  // Check password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      email: user.email,
      phone_number: user.phone_number,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
})

// @desc    Get User's Data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, first_name, last_name, user_name, email, phone_number } =
    await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    first_name,
    last_name,
    user_name,
    email,
    phone_number,
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export { registerUser, loginUser, getMe }
