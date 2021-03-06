const { authenticate } = require('@feathersjs/authentication').hooks

const { setCurrentUserId, forbidFields } = require('../../hooks')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [forbidFields('id', 'userId'), setCurrentUserId('userId')],
    update: [forbidFields('id', 'userId', 'recipeId')],
    patch: [forbidFields('id', 'userId', 'recipeId')],
    remove: [],
  },

  after: {
    all: [],
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
