import express from 'express'
import productRouter from './src/Routes/products.routes.js'

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})

app.use('/products', productRouter)
