import { db } from '../../configs/index.js'

export const deleteProductDb = async (productId) => {
  try {
    const res = await db('products').where('id', productId).del()
    return res
  } catch (error) {
    return error
  }
}
