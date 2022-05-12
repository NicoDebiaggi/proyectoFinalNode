import jwt from 'jsonwebtoken'
import { createUser, getUser } from '../database/querys/index.js'
import bcrypt from 'bcrypt'

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (req.body) {
      const user = await getUser({ email, password })
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString()
      }, process.env.API_SECRET, { expiresIn: '10m' })

      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email
        }
      })
    } else {
      const error = new Error('User not found')
      error.status = 400
      throw error
    }
  } catch (error) {
    error.status = 500
    next(error)
  }
}

export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  try {
    if (req.body) {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = await createUser({ firstName, lastName, email, password: hashPassword })
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString()
      }, process.env.API_SECRET, { expiresIn: '1m' })

      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email
        }
      })
    } else {
      const error = new Error('User data is required')
      error.status = 400
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const verifyToken = (req, res, next) => {
  try {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer' || req.session.token) {
      const token = req.headers.authorization?.split(' ')[1] || req.session.token
      jwt.verify(token, process.env.API_SECRET, function (err, decode) {
        if (err) {
          const error = new Error('Not authorized')
          error.status = 401
          throw error
        }
        req.user = decode
        res.send({ user: req.user })
      })
    } else {
      const error = new Error('Token is required')
      error.status = 401
      error.code = 'UNAUTHORIZED'
      throw error
    }
  } catch (error) {
    next(error)
  }
}
