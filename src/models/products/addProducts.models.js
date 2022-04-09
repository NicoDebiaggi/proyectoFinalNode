import { db } from '../../configs/index.js'

export const addProductDb = async ({ name, description, code, stock, price, thumbnail }) => {
  try {
    const res = await db('products').insert({
      name,
      description,
      code,
      stock,
      price,
      thumbnail
    })
    return res[0]
  } catch (error) {
    return error
  }
}
