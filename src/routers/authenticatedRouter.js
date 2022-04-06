const express = require('express')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = require('../middleware/setSessionAuthentication')

const DebugController = require('../controllers/debugController')
const RecipesController = require('../controllers/recipesController')

module.exports = (app) => {
  const authenticatedRouter = express.Router()

  const middleware = [
    setSessionAuthentication(),
    authenticate('jwt'),
  ]

  const debugController = new DebugController(app)
  authenticatedRouter.get('/debug_protected', middleware, debugController.index)

  const recipesController = new RecipesController(app)
  authenticatedRouter.post('/recipes/:id/rate', middleware, recipesController.rate)

  return authenticatedRouter
}
