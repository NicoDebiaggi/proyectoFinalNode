import { db } from '../../configs/index.js'

export const addProductToCartDb = async (cartId, productId, amount) => {
  try {
    const productOnCart = await db('cart_items').where({ cart_id: cartId, product_id: productId })
    const product = await db('products').where({ id: productId })
    if (productOnCart.length) {
      if ((productOnCart[0].quantity + amount) <= product[0].stock) {
        const res = await db('cart_items')
          .where({ cart_id: cartId, product_id: productId })
          .update({ quantity: productOnCart[0].quantity + amount })
        return res
      } else {
        const error = new Error(`Product with id ${productId} has only ${product[0].stock} in stock`)
        error.code = 'PRODUCT_OUT_OF_STOCK'
        throw error
      }
    } else {
      if (product.length) {
        if (product[0].stock >= amount) {
          const res = await db('cart_items').insert({ cart_id: cartId, product_id: productId, quantity: amount })
          return res
        } else {
          const error = new Error(`Product with id ${productId} has only ${product[0].stock} in stock`)
          error.code = 'PRODUCT_OUT_OF_STOCK'
          throw error
        }
      } else {
        const error = new Error(`Product with id ${productId} not found`)
        error.code = 'PRODUCT_NOT_FOUND'
        throw error
      }
    }
  } catch (error) {
    return error
  }
}
