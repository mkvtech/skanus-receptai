const app = require('../../../src/app')

describe('\'RecipeRatings\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/recipe-ratings')
    expect(service).toBeTruthy()
  })
})
