const store = require('./store')
const socket = require('../../socket').socket
const { config } = require('../../config')

const addMessage = (chat, user, message, file) => {
  return new Promise(async (resolve, reject) => {
    if(!chat || !user || !message){
      console.error('[messageController] No hay usuario o mensaje')
      reject('Incorrect data')
      return false
    }
    let fileUrl = ''
    if(file){
      const {uriSite, publicPath, uploadsPath} = config
      fileUrl = `${uriSite}${publicPath}${uploadsPath}/${file.filename}` 
    }

    const fullMessage = {
      chat,
      user, 
      message,
      date: new Date(),
      file: fileUrl
    }
    const result = await store.add(fullMessage)
    socket.io.emit('message', result)
    resolve(result)
  })
}

const getMessages = (filterUser) => {
  return new Promise((resolve, reject) => {
    //reject('Unexpected Error')
    resolve(store.list(filterUser))
  })
}

const updateMessage = (id, message) => {
  return new Promise(async (resolve, reject) => {
    if(!id || !message){
      reject('Invalid data')
    }
    const fullMessage = {
      message,
      updated_at: new Date()
    }
    const result = await store.update(id, fullMessage)
    resolve(result)
  }) 
}

const deleteMessage = (id) => {
  return new Promise(async (resolve, reject) => {
    if(!id){
      reject('Invalid id')
      return false
    }
    store.delete(id)
      .then(() => resolve())
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage, 
  deleteMessage
}