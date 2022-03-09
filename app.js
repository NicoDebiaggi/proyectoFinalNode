import express from 'express'
import productRouter from './src/Routes/products.routes.js'

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})
app.use(express.json())
app.use('/', productRouter)

app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status).send({ err: err.message })
})
