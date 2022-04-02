import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
      jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
        if (err) {
          const error = new Error('Not authorized')
          error.status = 401
          throw error
        }
        req.user = decode
        next()
      })
    } else {
      const error = new Error('Not authorized')
      error.status = 401
      throw error
    }
  } catch (error) {
    return next(error)
  }
}
