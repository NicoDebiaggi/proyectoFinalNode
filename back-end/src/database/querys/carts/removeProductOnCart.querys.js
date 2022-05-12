import { CartModel } from '../../models/index.js'

export const removeProductOnCartDb = async (cartId, productId) => {
  try {
    const res = await CartModel.findOneAndUpdate(
      { _id: cartId },
      { $pull: { products: { product: productId } } },
      { new: true }
    )
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while updating product on cart')
    error.code = code
    throw error
  }
}
