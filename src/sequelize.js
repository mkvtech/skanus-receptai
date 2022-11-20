const Sequelize = require('sequelize')

module.exports = function (app) {
  const logger = app.get('logger')

  const mysqlConfig = app.get('db').primary
  const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
    dialect: 'mysql',
    host: mysqlConfig.host,
    logging: (str) => {
      logger.info(str.substring(21), { type: 'sql' })
    },
  })

  app.set('sequelizeClient', sequelize)
}
