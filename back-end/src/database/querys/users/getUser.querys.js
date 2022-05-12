import { UserModel } from '../../models/index.js'
import bcrypt from 'bcrypt'

export const getUser = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email })
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (isPasswordValid) {
        return user
      } else {
        const error = new Error('Password is not valid')
        error.code = 'PASSWORD_NOT_VALID'
        error.status = 401
        throw error
      }
    }
  } catch (err) {
    const error = new Error(err.message || 'User not found')
    error.status = 404
    error.code = err.code
    throw error
  }
}
