const { config } = require('./config')
const db = require('mongoose')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const HOST = config.dbHost

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`


db.Promise = global.Promise
const connect = async () => {
  await db.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('[db] Conectada con éxito')
}

module.exports = connect