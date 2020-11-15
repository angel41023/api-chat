const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', (req, res) => {
  const filterUsers = req.query.name || null
  controller.getUsers(filterUsers)
    .then(userList => {
      response.success(req, res, userList, 200)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected Error', 500, error)
    })
})

router.post('/', (req, res) => {
  const {name} = req.body
  controller.addUser(name)
    .then((fullUser)=>{
      response.success(req, res, fullUser, 201)
    })
    .catch(error => {
      response.error(req, res, error, 400, 'Error en el controlador')
    })
})

router.patch('/:id', (req, res) => {
  controller.updateUser(req.params.id, req.body.name)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, 'Internal Error', 500, error)
    })
})

router.delete('/:id', (req, res) => {
  controller.deleteUser(req.params.id)
    .then(() => {
      response.success(req, res, `User ${req.params.id} deleted`, 200)
    })
    .catch(error => {
      response.error(req, res, 'Internal Error', 500, error)
    })
})

module.exports = router