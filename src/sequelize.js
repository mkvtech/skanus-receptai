const Sequelize = require('sequelize')

module.exports = function (app) {
  const mysqlConfig = app.get('db').primary
  const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
    dialect: 'mysql',
    host: mysqlConfig.host,
    logging: false,
  })

  app.set('sequelizeClient', sequelize)
}
