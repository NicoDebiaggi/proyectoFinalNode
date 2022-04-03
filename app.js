import 'dotenv/config'
import express from 'express'
import { productRouter, cartRouter, userRouter } from './src/routes/index.js'
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
  console.log(err)
  res.status(err.status).send({ err: err.message })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})
