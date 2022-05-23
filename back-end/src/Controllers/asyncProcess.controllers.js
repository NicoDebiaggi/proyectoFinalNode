import { fork } from 'child_process'

export const genRandomNumbers = async (req, res, next) => {
  try {
    const child = fork('./src/helpers/genRandomNumbers.js')
    child.send(req.query.cant || 100000000)
    child.on('message', (data) => {
      res.json(data)
    })
  } catch (error) {
    next(error)
  }
}
