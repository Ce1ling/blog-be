const express = require('express')

const router = express.Router()

router.get('/api/users', (request, response) => {
  response.send({
    code: 0,
    msg: 'API users'
  })
})

module.exports = router