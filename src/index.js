const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})