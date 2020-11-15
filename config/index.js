require ('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME, 
  uriSite: process.env.URI_SITE,
  publicPath: process.env.PUBLIC_PATH,
  uploadsPath: process.env.UPLOADS_PATH
}

module.exports = { config }