import 'dotenv/config'
import express from 'express'
import { productRouter, cartRouter, userRouter } from './src/routes/index.js'
import http from 'http'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ credentials: true, origin: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: process.env.API_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.DB_URL,
    collection: 'sessions'
  }),
  cookie: {
    maxAge: 60 * 1000
  }
}))
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
