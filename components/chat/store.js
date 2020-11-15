const Model = require('./model')

const addChat = async (chat) => {
  const myChat = new Model(chat)
  return myChat.save()
} 

const getChats = (userId) => {
  return new Promise((resolve, reject) => {
    let filter = {}
    if(userId != null){
      userId = { users: userId }
    }
    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if(error){
          reject(error)
          return false
        }
        resolve(populated)
      })
  })
}

module.exports = {
  add: addChat,
  list: getChats
}
