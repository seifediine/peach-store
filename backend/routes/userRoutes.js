import express from 'express'

const router = express.Router()

import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router
