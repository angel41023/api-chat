const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/:userId', (req, res) => {
  const {userId} = req.body
  controller.getChats(userId)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected Error', 500, error)
    })
})

router.post('/', (req, res) => {
  const {users} = req.body
  controller.addChat(users)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(error => {
      response.error(req, res, error, 400, 'Error en el controlador')
    })
})

module.exports = router