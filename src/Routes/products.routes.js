import express from 'express'
import {
  getProducts,
  getRandomProduct,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct
} from '../controllers'
import { verifyToken } from '../middlewares'

export const productRouter = express.Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/random', getRandomProduct)
productRouter.get('/products/:id', getProductById)
productRouter.post('/products', verifyToken, postProduct)
productRouter.put('/products/:id', verifyToken, updateProduct)
productRouter.delete('/products/:id', verifyToken, deleteProduct)
