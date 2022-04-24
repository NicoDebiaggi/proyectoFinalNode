import { ProductModel } from '../../models/productModel.models.js'

export const deleteProductDb = async (productId) => {
  try {
    const res = await ProductModel.findOneAndDelete({ _id: productId })
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while deleting product')
    error.code = code
    throw error
  }
}
