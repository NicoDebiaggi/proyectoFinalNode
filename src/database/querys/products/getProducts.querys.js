import { ProductModel } from '../../models/productModel.models.js'

export const getProductsDb = async () => {
  try {
    const res = await ProductModel.find()
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while getting products')
    error.code = code
    throw error
  }
}

export const getRandomProductDb = async () => {
  try {
    const res = await ProductModel.aggregate([
      { $sample: { size: 1 } }
    ])
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while getting random product')
    error.code = code
    throw error
  }
}

export const getProductByIdDb = async (productId) => {
  try {
    const res = await ProductModel.findOne({ _id: productId })
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while getting product by id')
    error.code = code
    throw error
  }
}
