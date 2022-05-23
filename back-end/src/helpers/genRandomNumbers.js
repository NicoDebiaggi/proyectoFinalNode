process.on('message', function (cant) {
  const numbers = []
  for (let i = 0; i < cant; i++) {
    const number = Math.floor(Math.random() * 1000) + 1
    numbers.push(number)
  }
  const result = {}
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    if (result[number]) {
      result[number]++
    } else {
      result[number] = 1
    }
  }
  process.send(result)
  process.exit(0)
})
