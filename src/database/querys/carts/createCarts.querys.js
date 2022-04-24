import { CartModel } from '../../models/index.js'

export const createCartDb = async (userId) => {
  try {
    const cart = new CartModel({
      user: userId
    })
    const res = await cart.save()
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while creating cart')
    error.code = code || 'UNKNOWN_ERROR'
    throw error
  }
}
