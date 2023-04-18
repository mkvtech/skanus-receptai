const app = require('../src/app')
const dbConfig = app.get('db')

const env = process.env.NODE_ENV || 'development'

console.log(dbConfig)
console.log(env)

module.exports = {
  [env]:
    dbConfig.dbType === 'mysql'
      ? {
          dialect: 'mysql',
          username: dbConfig.mysql.user,
          password: dbConfig.mysql.password,
          database: dbConfig.mysql.database,
          host: dbConfig.mysql.host,
          migrationStorageTableName: '_migrations',
        }
      : {
          dialect: 'sqlite',
          storage: 'skanus_receptai.sqlite',
          migrationStorageTableName: '_migrations',
        },
}
