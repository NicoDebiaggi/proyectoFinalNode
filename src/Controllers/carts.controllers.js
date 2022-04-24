import {
  createCartDb,
  deleteCartDb,
  getCartDb,
  addProductToCartDb,
  removeProductOnCartDb
} from '../database/querys/index.js'

export const createCart = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const dbRes = await createCartDb(userId)
    res.send(dbRes)
  } catch (error) {
    next(error)
  }
}

export const deleteCart = (req, res, next) => {
  try {
    const cartId = req.params.id
    const dbRes = deleteCartDb(cartId)
    if (dbRes) {
      res.send(`Cart with id ${cartId} deleted`)
    }
  } catch (error) {
    return next(error)
  }
}

export const getCart = async (req, res, next) => {
  try {
    const cartId = req.params.id
    const cart = await getCartDb(cartId)
    if (cart) {
      res.send(cart)
    } else {
      const error = new Error(`Cart with id ${cartId} not found`)
      error.code = 'CART_NOT_FOUND'
      throw error
    }
  } catch (error) {
    return next(error)
  }
}

export const addProductOnCart = async (req, res, next) => {
  try {
    const cartId = req.params.id
    const productId = req.params.productId
    const amount = isNaN(Number(req.body.amount)) ? 1 : Number(req.body.amount)
    const dbRes = await addProductToCartDb(cartId, productId, amount)
    if (!dbRes.code) {
      res.send(`Product with id ${productId} added to cart with id ${cartId}`)
    } else {
      throw dbRes
    }
  } catch (error) {
    error.status = 500
    next(error)
  }
}

export const removeProductOnCart = async (req, res, next) => {
  try {
    const cartId = req.params.id
    const productId = req.params.productId

    const dbRes = await removeProductOnCartDb(cartId, productId)
    if (!dbRes.code) {
      res.send(`Product with id ${productId} removed from cart with id ${cartId}`)
    } else {
      throw dbRes
    }
  } catch (error) {
    error.status = 500
    next(error)
  }
}
