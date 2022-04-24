import { CartModel } from '../../models/index.js'

export const getCartDb = async (cartId) => {
  try {
    const res = await CartModel.findOne({ _id: cartId }).populate({
      path: 'products.product',
      select: 'name description code thumbnail price stock'
    })
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while getting cart')
    error.code = code
    throw error
  }
}
