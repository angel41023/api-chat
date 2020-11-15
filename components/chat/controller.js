const store = require('./store')

const addChat = (users) => {
  if(!users || !Array.isArray(users)){
    console.error('[chatsController] No son correctos los usuarios')
    return Promise.reject('Invalid User list')
  }

  const chat = {
    users, 
    created_at: new Date(),
    updated_at: new Date()
  }
  return store.add(chat)
}

const getChats = (userId) => {
  return store.list(userId)
}

module.exports = {
  addChat,
  getChats
}