const app = require('../src/app')

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('api/authentication')).toBeTruthy()
  })

  describe('local strategy', () => {
    const userInfo = {
      email: 'someone@example.com',
      password: 'supersecret',
      firstName: 'John',
      lastName: 'Doe',
    }

    beforeAll(async () => {
      try {
        await app.service('api/users').create(userInfo)
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    })

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('api/authentication').create({
        strategy: 'local',
        ...userInfo,
      })

      expect(accessToken).toBeTruthy()
      expect(user).toBeTruthy()
    })
  })
})
