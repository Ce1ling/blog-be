const express = require('express')

const router = express.Router()

router.get('/api/blog', (request, response) => {
  response.send({ code: 0, msg: 'API blog list' })
})

router.post('/api/blog', (request, response) => {
  response.send({ code: 0, msg: 'API blog create' })
})

router.put('/api/blog', (request, response) => {
  response.send({ code: 0, msg: 'API blog update' })
})

router.delete('/api/blog', (request, response) => {
  response.send({ code: 0, msg: 'API blog delete' })
})

module.exports = router