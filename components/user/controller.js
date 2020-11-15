const store = require('./store')

const addUser = (name) => {
  if(!name){
    console.error('[userController] No hay usuario')
    return Promise.reject('Invalid name')
  }
  const user = {
    name, 
    created_at: new Date(),
    updated_at: new Date()
  }
  return store.add(user)
}

const getUsers = (filterUser) => {
  return new Promise((resolve, reject) => {
    //reject('Unexpected Error')
    resolve(store.list(filterUser))
  })
}

const updateUser= (id, name) => {
  return new Promise(async (resolve, reject) => {
    if(!id || !name){
      reject('Invalid data')
    }
    const user = {
      name,
      updated_at: new Date()
    }
    const result = await store.update(id, user)
    resolve(result)
  }) 
}

const deleteUser = (id) => {
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
  addUser,
  getUsers,
  updateUser, 
  deleteUser
}