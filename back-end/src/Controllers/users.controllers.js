import jwt from 'jsonwebtoken'

export const login = (req, res, next) => {
  const name = req.body.name
  try {
    if (name) {
      const adminToken = jwt.sign({
        id: 1,
        name: name,
        email: 'test@gmail.com',
        role: 'admin',
        timestamp: new Date().toISOString()
      }, process.env.API_SECRET, { expiresIn: '1m' })
      req.session.token = adminToken
      res.send({ adminToken })
    } else {
      const error = new Error('Name is required')
      error.status = 400
      throw error
    }
  } catch (error) {
    error.status = 500
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
      throw error
    }
  } catch (error) {
    next(error)
  }
}
