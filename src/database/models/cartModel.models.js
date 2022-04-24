import mongoose from 'mongoose'
import { cartSchema } from '../schemas/index.js'

export const CartModel = mongoose.model('Cart', cartSchema)
