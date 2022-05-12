import mongoose from 'mongoose'
import { productSchema } from '../schemas/index.js'

export const ProductModel = mongoose.model('Product', productSchema)
