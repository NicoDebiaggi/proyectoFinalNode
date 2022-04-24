import {
  addProductDb,
  getProductsDb,
  getRandomProductDb,
  getProductByIdDb,
  updateProductDb,
  deleteProductDb
} from '../database/querys/index.js'

export const getProducts = async (req, res, next) => {
  try {
    const products = await getProductsDb()
    res.send(products)
  } catch (error) {
    next(error)
  }
}

export const getRandomProduct = async (req, res, next) => {
  try {
    const randomProduct = await getRandomProductDb()
    res.send(randomProduct)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const productId = (req.params.id)
    const product = await getProductByIdDb(productId)
    if (product) {
      res.send(product)
    } else {
      const error = new Error(`Product with id ${productId} not found`)
      error.code = 'PRODUCT_NOT_FOUND'
      throw error
    }
  } catch (error) {
    return next(error)
  }
}

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      code: req.body.code,
      stock: req.body.stock,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    }
    const dbRes = await addProductDb(newProduct)
    res.send(dbRes)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const updatedProduct = req.body
    const dbRes = await updateProductDb(productId, updatedProduct)
    if (dbRes) {
      res.send(`Product with id ${productId} updated`)
    } else {
      throw dbRes
    }
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const dbRes = await deleteProductDb(productId)
    if (dbRes) {
      res.send(`Product with id ${productId} deleted`)
    } else {
      throw dbRes
    }
  } catch (error) {
    return next(error)
  }
}
