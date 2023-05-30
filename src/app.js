const express = require('express')
const routes = require('./routes')
const { PORT } = require('./config/server')

const app = express()

app.all('*', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Methods', request.headers['access-control-request-method'])
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  response.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes.forEach(route => app.use(route))
app.use((_, response, next) => {
  response.send({ code: -1, msg: '404 Not Found' })
  next()
})

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`Server running fialure, reason: ${error}`)
  }
  console.log(`********** Server running at "http://localhost:${PORT}" **********`)
})