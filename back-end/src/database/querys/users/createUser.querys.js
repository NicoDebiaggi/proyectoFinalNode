import { UserModel } from '../../models/index.js'

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password
    })
    const res = await user.save()
    return res
  } catch (err) {
    const error = new Error('Error while adding product')
    error.code = err.code
    throw error
  }
}
