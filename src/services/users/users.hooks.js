const { authenticate } = require('@feathersjs/authentication').hooks

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks

const { forbidFields } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [forbidFields('id'), hashPassword('password')],
    update: [forbidFields('id'), hashPassword('password'), authenticate('jwt')],
    patch: [forbidFields('id'), hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
