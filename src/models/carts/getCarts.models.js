import { db } from '../../configs/index.js'

export const getCartDb = async (cartId) => {
  try {
    const res = await db('cart_items').where({ cart_id: cartId }).join('products', 'cart_items.product_id', 'products.id')
    if (res.length) {
      const products = res.map(item => {
        return {
          prodId: item.product_id,
          name: item.name,
          description: item.description,
          code: item.code,
          thumbnail: item.thumbnail,
          price: item.price,
          stock: item.stock,
          quantity: item.quantity
        }
      })
      return {
        id: cartId,
        products: products
      }
    } else {
      return {
        id: cartId,
        products: []
      }
    }
  } catch (error) {
    return error
  }
}
