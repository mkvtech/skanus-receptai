const app = require('../../src/app')

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('api/authentication')).toBeTruthy()
  })

  describe('local strategy', () => {
    const userCredentials = {
      email: 'someone@example.com',
      password: 'supersecret',
    }

    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      ...userCredentials,
    }

    beforeEach(async () => {
      await app.service('api/users').create(userData)
    })

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('api/authentication').create({
        strategy: 'local',
        ...userCredentials,
      })

      expect(accessToken).toBeTruthy()
      expect(user).toBeTruthy()
    })
  })
})
