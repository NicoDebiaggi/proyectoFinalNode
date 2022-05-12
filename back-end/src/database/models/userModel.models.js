import mongoose from 'mongoose'
import { userSchema } from '../schemas/index.js'

export const UserModel = mongoose.model('User', userSchema)
