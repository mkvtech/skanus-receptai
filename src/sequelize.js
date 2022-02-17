const Sequelize = require('sequelize')

module.exports = function (app) {
  const connectionString = app.get('sqlite')
  const sequelize = new Sequelize(connectionString, {
    dialect: 'sqlite',
    logging: false,
    define: {
      freezeTableName: true,
    },
  })

  app.set('sequelizeClient', sequelize)
}
