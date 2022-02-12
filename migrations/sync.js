const { sequelize } = require('./models')

;(async () => {
  console.log('Syncrhonizing database...')

  await sequelize.sync({ force: true })

  console.log('All models were synchronized successfully.')
  console.log('Dont forget to run `npx sequelize db:seed:all` to fill tables with sample data.')
})()
