import express from 'express'
import {
  createCart,
  deleteCart,
  getCart,
  addProductOnCart,
  removeProductOnCart
} from '../controllers/index.js'

export const cartRouter = express.Router()

cartRouter.post('/cart', createCart)
cartRouter.delete('/cart/:id', deleteCart)
cartRouter.get('/cart/:id/products', getCart)
cartRouter.post('/cart/:id/products/:productId', addProductOnCart)
cartRouter.delete('/cart/:id/products/:productId', removeProductOnCart)
