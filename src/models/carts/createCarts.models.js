import { db } from '../../configs/index.js'

export const createCartDb = async () => {
  try {
    const res = await db('carts').insert({})
    await db('cart_items').insert({ cart_id: res[0] })
    return res[0]
  } catch (error) {
    return error
  }
}
