import { db } from '../../configs/index.js'

export const updatedProductDb = async (productId, product) => {
  try {
    const res = await db('products').where('id', productId).update(product)
    return res
  } catch (error) {
    return error
  }
}
