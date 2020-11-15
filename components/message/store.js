const Model = require('./model')

const addMessage = async (message) => {
  const myMessage = new Model(message)
  const newMessage = await myMessage.save()
  return newMessage
} 

const getMessages = (filterUser) => {
  return new Promise((resolve, reject) => {
    let filter = {}
    if(filterUser != null){
      filter = { user: filterUser }
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if(error){
          reject(error)
          return false
        }
        resolve(populated)
      })
  })
}

const updateMessage = async (id, message) => {
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.message = message
  const updatedMessage = await foundMessage.save()
  return updatedMessage
}

const deleteMessage = async (id) => {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateMessage,
  delete: deleteMessage
}
