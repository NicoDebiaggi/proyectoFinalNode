import express from 'express'
import { getProducts, getRandomProduct } from '../Controllers/products.controllers.js'

const router = express.Router()

router.get('/getProducts', getProducts)
router.get('/getRandomProduct', getRandomProduct)

export default router
