import { CartModel } from '../../models/index.js'

export const deleteCartDb = async (cartId) => {
  try {
    const res = await CartModel.findOneAndDelete({ _id: cartId })
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while deleting cart')
    error.code = code
    throw error
  }
}
