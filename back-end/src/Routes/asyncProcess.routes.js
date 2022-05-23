import express from 'express'
import {
  genRandomNumbers
} from '../controllers/index.js'

export const asyncProcessRouter = express.Router()

asyncProcessRouter.post('/randoms', genRandomNumbers)
