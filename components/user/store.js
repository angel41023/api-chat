const Model = require('./model')

const addUser = async (user) => {
  const myUser = new Model(user)
  const newUser= await myUser.save()
  return newUser
} 

const getUsers = async (filterName) => {
  let filter = {}
  if(filterName != null){
    filter = { name: filterName }
  }
  const users = await Model.find(filter)
  return users
}

const updateUser = async (id, data) => {
  const foundUser = await Model.findOne({
    _id: id
  })
  const {name, updated_at} = data
  foundUser.name = name
  foundUser.updated_at = updated_at
  const updatedUser = await foundUser.save()
  return updatedUser
}

const deleteUser = async (id) => {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  delete: deleteUser
}
