const Sequelize = require('sequelize')

module.exports = function (app) {
  const logger = app.get('logger')
  const logging = (str) => logger.info(str.substring(21), { type: 'sql' })

  const dbConfig = app.get('db')

  let sequelize

  if (dbConfig.dbType === 'mysql') {
    const mysqlConfig = dbConfig.mysql
    sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
      dialect: 'mysql',
      host: mysqlConfig.host,
      logging,
    })
  } else if (dbConfig.dbType === 'sqlite') {
    sequelize = new Sequelize(dbConfig.sqlite, {
      dialect: 'sqlite',
      define: { freezeTableName: true },
      logging,
    })
  }

  app.set('sequelizeClient', sequelize)
}
