import { createRequire } from 'module'
import * as fs from 'fs'
const require = createRequire(import.meta.url)
const carts = require('../assets/carts.json')
const products = require('../assets/products.json')

export const getMaxIdCart = () => {
  let maxId = 0
  carts?.forEach(cart => {
    if (cart.id > maxId) {
      maxId = cart.id
    }
  })
  return maxId
}

export const createCart = (req, res, next) => {
  try {
    const newCart = {
      id: getMaxIdCart() + 1,
      timestamp: new Date().toISOString(),
      products: []
    }
    carts.push(newCart)
    fs.writeFileSync('./src/assets/carts.json', JSON.stringify(carts))
    res.send({ cartId: newCart.id })
  } catch (error) {
    error.status = 500
    next(error)
  }
}

export const deleteCart = (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
    const cartIndex = carts.findIndex(cart => cart.id === cartId)

    if (~cartIndex) {
      carts.splice(cartIndex, 1)
      fs.writeFileSync('./src/assets/carts.json', JSON.stringify(carts))
      res.send(`Cart with id ${cartId} deleted`)
    } else {
      const error = new Error(`Cart with id ${cartId} not found`)
      error.status = 404
      throw error
    }
  } catch (error) {
    return next(error)
  }
}

export const getCart = (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
    const cart = carts.find(cart => cart.id === cartId)

    if (cart) {
      res.send({ cart: cart.products })
    } else {
      const error = new Error(`Cart with id ${cartId} not found`)
      error.status = 404
      throw error
    }
  } catch (error) {
    return next(error)
  }
}

export const addProductOnCart = (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
    const productId = Number(req.params.productId)
    const amount = isNaN(Number(req.body.amount)) ? 1 : Number(req.body.amount)

    const cartIndex = carts.findIndex(cart => cart.id === cartId)
    const product = products.find(product => product.id === productId)

    if (~cartIndex) {
      if (product && product.stock >= amount) {
        const productIndex = carts[cartIndex].products.findIndex(
          product => product.id === productId
        )
        if (~productIndex) {
          if ((carts[cartIndex].products[productIndex].amount + amount) <= product.stock) {
            carts[cartIndex].products[productIndex].amount += amount
          } else {
            const error = new Error(
              `Product with id ${productId} has only ${product.stock} in stock`
            )
            error.status = 400
            throw error
          }
        } else {
          carts[cartIndex].products.push({
            ...product,
            amount
          })
        }
        fs.writeFileSync('./src/assets/carts.json', JSON.stringify(carts))
        res.send({ cart: carts[cartIndex].products })
      } else {
        const error = new Error(`Product with id ${productId} not found`)
        error.status = 404
        throw error
      }
    } else {
      const error = new Error(`Cart with id ${cartId} not found`)
      error.status = 404
      throw error
    }
  } catch (error) {
    error.status = 500
    next(error)
  }
}

export const removeProductOnCart = (req, res, next) => {
  try {
    const cartId = Number(req.params.id)
    const productId = Number(req.params.productId)

    const cartIndex = carts.findIndex(cart => cart.id === cartId)

    if (~cartIndex) {
      const productIndex = carts[cartIndex].products.findIndex(product => product.id === productId)
      if (~productIndex) {
        carts[cartIndex].products.splice(productIndex, 1)
        fs.writeFileSync('./src/assets/carts.json', JSON.stringify(carts))
        res.send({ cart: carts[cartIndex].products })
      } else {
        const error = new Error(`Product with id ${productId} not found in the cart`)
        error.status = 404
        throw error
      }
    } else {
      const error = new Error(`Cart with id ${cartId} not found`)
      error.status = 404
      throw error
    }
  } catch (error) {
    error.status = 500
    next(error)
  }
}
