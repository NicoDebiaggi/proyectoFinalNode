import { CartModel, ProductModel } from '../../models/index.js'

export const addProductToCartDb = async (cartId, productId, amount) => {
  try {
    const cart = await CartModel.findOne({ _id: cartId })
    const isInCart = cart.products.find(product => product.product.toString() === productId.toString())
    const product = await ProductModel.findOne({ _id: productId })
    if (product.stock < amount) {
      const error = new Error(`Product with id ${productId} has only ${product.stock} in stock`)
      error.code = 'PRODUCT_OUT_OF_STOCK'
      throw error
    } else {
      if (!isInCart) {
        const res = await CartModel.findOneAndUpdate(
          { _id: cartId },
          { $push: { products: { product: productId, quantity: amount } } },
          { new: true }
        )
        return res
      } else {
        const res = await CartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': productId },
          { $set: { 'products.$.quantity': amount } },
          { new: true }
        )
        return res
      }
    }
  } catch (err) {
    const code = err.errors[Object.keys(err.errors)[0]].reason.code
    const error = new Error('Error while adding product to cart')
    error.code = code
    throw error
  }
}
