const express = require('express')
const path = require('path')
const multer = require('multer')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({
  storage
})

router.get('/', (req, res) => {
  const filterMessages = req.query.user || null
  controller.getMessages(filterMessages)
    .then(messageList => {
      response.success(req, res, messageList, 200)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected Error', 500, error)
    })
})

router.post('/', upload.single('file'), (req, res) => {
  const {chat, user, message} = req.body
  controller.addMessage(chat, user, message, req.file)
    .then((fullMessage)=>{
      response.success(req, res, fullMessage, 201)
    })
    .catch(error => {
      response.error(req, res, error, 400, 'Error en el controlador')
    })
})

router.patch('/:id', (req, res) => {
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, 'Internal Error', 500, error)
    })
})

router.delete('/:id', (req, res) => {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Message ${req.params.id} deleted`, 200)
    })
    .catch(error => {
      response.error(req, res, 'Internal Error', 500, error)
    })
})

module.exports = router