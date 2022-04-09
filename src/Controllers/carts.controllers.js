import {
  createCartTable,
  createCartDb,
  deleteCartDb,
  getCartDb,
  addProductToCartDb,
  removeProductOnCartDb
} from '../models/index.js'

// initialize tables
createCartTable()

export const createCart = async (req, res, next) => {
  try {
    const dbRes = await createCartDb()
    if (!dbRes.code) {
      res.send({ id: dbRes })
    } else {
      throw dbRes
    }
  } catch (error) {
    next(error)
  }
}

export const deleteCart = (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
    const dbRes = deleteCartDb(cartId)
    if (!dbRes.code) {
      res.send(`Cart with id ${cartId} deleted`)
    } else {
      throw dbRes
    }
  } catch (error) {
    return next(error)
  }
}

export const getCart = async (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
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
    const cartId = Number(req.params.id)
    const productId = Number(req.params.productId)
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
    const cartId = Number(req.params.id)
    const productId = Number(req.params.productId)

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
