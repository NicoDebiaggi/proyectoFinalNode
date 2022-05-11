import express from 'express'
import {
  login,
  verifyToken
} from '../controllers/index.js'

export const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/admin', verifyToken)
