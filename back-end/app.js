import 'dotenv/config'
import './src/configs/db.configs.js'
import express from 'express'
import { productRouter, asyncProcessRouter, userRouter, cartRouter } from './src/routes/index.js'
import { getError } from './src/helpers/index.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import http from 'http'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import * as path from 'path'

const argv = yargs(hideBin(process.argv)).argv
const app = express()
const server = http.createServer(app)
const PORT = argv.port || 8080 // process.env.PORT || 8080

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
    maxAge: 10 * 60 * 1000
  }
}))

app.use('/info', (req, res) => {
  res.json({
    argv,
    platform: process.platform,
    memInfo: process.memoryUsage(),
    nodeVersion: process.version,
    executionPath: process.cwd(),
    pid: process.pid,
    proyectRoot: path.resolve(path.dirname(''))
  })
})

app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', userRouter)
app.use('/api', asyncProcessRouter)

app.use(function (err, req, res, next) {
  const error = getError(err.code, err.message)
  console.log(err)
  res.status(error.status).send(error)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥🔥`)
})
