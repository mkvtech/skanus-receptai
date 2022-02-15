const app = require('../../src/app')

describe("'recipes' service", () => {
  it('registered the service', () => {
    const service = app.service('api/recipes')
    expect(service).toBeTruthy()
  })
})
