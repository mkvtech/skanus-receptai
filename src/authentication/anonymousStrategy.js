const { AuthenticationBaseStrategy } = require('@feathersjs/authentication')

class AnonymousStrategy extends AuthenticationBaseStrategy {
  // eslint-disable-next-line no-unused-vars
  async authenticate(authentication, params) {
    return {
      anonymous: true,
    }
  }
}

module.exports = { AnonymousStrategy }
