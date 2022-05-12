import { ProductModel } from '../../models/productModel.models.js'

export const updateProductDb = async (productId, product) => {
  try {
    const res = await ProductModel.findOneAndUpdate({ _id: productId }, product, { new: true })
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while updating product')
    error.code = code
    throw error
  }
}
