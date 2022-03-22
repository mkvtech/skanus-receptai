const express = require('express')
const { authenticate } = require('@feathersjs/express')

const allowAnonymous = require('./middleware/allowAnonymous')
const setSessionAuthentication = require('./middleware/setSessionAuthentication')

const debugController = require('./controllers/debugController')
const applicationController = require('./controllers/applicationController')
const AuthorsRecipesController = require('./controllers/authorsRecipesController')

module.exports = (app) => {
  const router = express.Router()

  router.get('/debug', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), debugController.show)
  router.get('/debug_protected', setSessionAuthentication(), authenticate('jwt'), debugController.show)

  router.get('/', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), applicationController.index)

  const authorsRecipesController = new AuthorsRecipesController(app)
  router.get('/author', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), authorsRecipesController.index)

  return router
}
