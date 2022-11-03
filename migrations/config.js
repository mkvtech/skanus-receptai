const app = require('../src/app')
const dbConfig = app.get('db').primary

const env = process.env.NODE_ENV || 'development'

module.exports = {
  [env]: {
    dialect: 'mysql',
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    migrationStorageTableName: '_migrations',
  },
}
