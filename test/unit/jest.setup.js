const app = require('../../src/app')

global.beforeEach(async () => {
  await app.get('sequelizeClient').sync({ force: true })
})

// prettier-ignore
global.afterEach(() => {

})
