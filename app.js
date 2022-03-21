import express from 'express'
import productRouter from './src/Routes/products.routes.js'
import { products, getMaxId } from './src/Controllers/products.controllers.js'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 8080
const __dirname = path.resolve()
const chat = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/Views/Layouts')

app.get('/products', (req, res) => {
  res.render('layout', { products })
})
app.post('/products', (req, res) => {
  const newProduct = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id: getMaxId() + 1
  }
  products.push(newProduct)
  res.redirect('/products')
})

app.use('/api', productRouter)

app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status).send({ err: err.message })
})

io.on('connection', (socket) => {
  io.emit('updatedChat', chat)

  socket.on('product', (product) => {
    const newProduct = {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      id: getMaxId() + 1
    }
    products.push(newProduct)
    io.emit('updatedProducts')
  })

  socket.on('message', (message) => {
    const date = new Date()
    chat.push({ ...message, date })
    io.emit('updatedChat', chat)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})
