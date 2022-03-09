import express from 'express'
import { getProducts, getRandomProduct, getProductById, postProduct, updateProduct, deleteProduct } from '../Controllers/products.controllers.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/random', getRandomProduct)
router.get('/products/:id', getProductById)
router.post('/products', postProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
