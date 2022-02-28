import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const products = require('../assets/products.json')

export const getProducts = (req, res) => {
  res.send(products)
}

export const getRandomProduct = (req, res) => {
  const randomProduct = products[Math.floor(Math.random() * products.length)]
  res.send(randomProduct)
}
