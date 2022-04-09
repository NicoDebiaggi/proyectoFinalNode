import { db } from '../../configs/index.js'

export const getProductsDb = async () => {
  try {
    const res = await db.select('*').from('products')
    return res
  } catch (error) {
    return error
  }
}

export const getRandomProductDb = async () => {
  try {
    const res = await db.select('*').from('products').orderByRaw('RAND()').limit(1)
    return res
  } catch (error) {
    return error
  }
}

export const getProductByIdDb = async (productId) => {
  try {
    const res = await db.select('*').from('products').where('id', productId)
    return res
  } catch (error) {
    return error
  }
}
