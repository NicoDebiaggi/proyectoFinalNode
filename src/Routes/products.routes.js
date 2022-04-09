import express from 'express'
import {
  getProducts,
  getRandomProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/index.js'
import { verifyToken } from '../middlewares/index.js'

export const productRouter = express.Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/random', getRandomProduct)
productRouter.get('/products/:id', getProductById)
productRouter.post('/products', verifyToken, addProduct)
productRouter.put('/products/:id', verifyToken, updateProduct)
productRouter.delete('/products/:id', verifyToken, deleteProduct)
