import { db } from '../../configs/index.js'

export const deleteCartDb = async (cartId) => {
  try {
    const res = await db('carts').where('id', cartId).del()
    return res
  } catch (error) {
    return error
  }
}
