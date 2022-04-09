import { db } from '../../configs/index.js'

export const removeProductOnCartDb = async (cartId, productId) => {
  try {
    const res = await db('cart_items')
      .where({ cart_id: cartId, product_id: productId })
      .del()
    if (res > 0) {
      return res
    } else {
      const error = new Error(`Product with id ${productId} not found on cart with id ${cartId}`)
      error.code = 'PRODUCT_NOT_FOUND'
      throw error
    }
  } catch (error) {
    return error
  }
}
