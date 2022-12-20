const app = require('../src/app')
const dbConfig = app.get('db')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  [env]:
    dbConfig.dbType === 'mysql'
      ? {
          dialect: 'mysql',
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          host: dbConfig.host,
          migrationStorageTableName: '_migrations',
        }
      : {
          dialect: 'sqlite',
          storage: 'skanus_receptai.sqlite',
          migrationStorageTableName: '_migrations',
        },
}
