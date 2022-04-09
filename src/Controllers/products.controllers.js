import {
  createProductTable,
  addProductDb,
  getProductsDb,
  getRandomProductDb,
  getProductByIdDb,
  updatedProductDb,
  deleteProductDb
} from '../models/index.js'

// initialize table
createProductTable()

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
    const productId = Number(req.params.id)
    const product = await getProductByIdDb(productId)
    if (product && product.length > 0) {
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
    if (!dbRes.code) {
      res.send({ ...newProduct, id: dbRes })
    } else {
      throw dbRes
    }
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.id)
    const updatedProduct = req.body
    const dbRes = await updatedProductDb(productId, updatedProduct)
    if (!dbRes.code) {
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
    const productId = Number(req.params.id)
    const dbRes = await deleteProductDb(productId)
    if (!dbRes.code) {
      res.send(`Product with id ${productId} deleted`)
    } else {
      throw dbRes
    }
  } catch (error) {
    return next(error)
  }
}
