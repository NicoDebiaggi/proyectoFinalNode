import express from 'express'
import {
  login,
  verifyToken,
  signUp
} from '../controllers/index.js'

export const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/signUp', signUp)
userRouter.post('/admin', verifyToken)
