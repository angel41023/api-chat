const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  name: String,
  created_at: Date,
  updated_at: Date
})

const model = mongoose.model('User', mySchema)
module.exports = model