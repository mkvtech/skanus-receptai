const app = require('../../../src/app')

describe("'comments' service", () => {
  it('registered the service', () => {
    const service = app.service('api/comments')
    expect(service).toBeTruthy()
  })
})
