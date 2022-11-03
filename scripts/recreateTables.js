// This scripts drops all tables and recreates them
console.log(__filename)

const app = require('../src/app')
const sequelizeClient = app.get('sequelizeClient')

;(async () => {
  console.log('Syncrhonizing Sequelize tables...')

  await sequelizeClient.sync({ force: true })

  console.log('DONE')

  sequelizeClient.close()
})()
