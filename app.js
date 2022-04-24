import 'dotenv/config'
import './src/configs/db.configs.js'
import express from 'express'
import { productRouter, cartRouter, userRouter } from './src/routes/index.js'
import { getError } from './src/helpers/index.js'
import http from 'http'

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', userRouter)

app.use(function (err, req, res, next) {
  const error = getError(err.code, err.message)
  console.log(err)
  res.status(error.status).send(error)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})
