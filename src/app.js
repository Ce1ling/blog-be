const express = require('express')
const routes = require('./routes')

const app = express()

const PORT = 3211

routes.forEach(route => app.use(route))

app.use((_, response, next) => {
  response.send({ code: -1, msg: '404 Not Found' })
  next()
})

app.all('*', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Control-Access-Allowe-Methods', request.method)
  response.header('Control-Access-Allowe-Headers', 'Content-Type')
  response.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`Server running fialure, reason: ${error}`)
  }
  console.log(`********** Server running on "http://localhost:${PORT}" **********`)
})