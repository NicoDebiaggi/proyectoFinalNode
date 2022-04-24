import { ProductModel } from '../../models/productModel.models.js'

export const addProductDb = async ({ name, description, code, stock, price, thumbnail }) => {
  try {
    const product = await ProductModel.create({
      name,
      description,
      code,
      stock,
      price,
      thumbnail
    })
    const res = await product.save()
    return res
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while adding product')
    error.code = code
    throw error
  }
}
