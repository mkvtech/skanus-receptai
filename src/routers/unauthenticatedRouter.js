const express = require('express')
const { authenticate } = require('@feathersjs/express')

const allowAnonymous = require('../middleware/allowAnonymous')
const setSessionAuthentication = require('../middleware/setSessionAuthentication')

const ApplicationController = require('../controllers/applicationController')
const DebugController = require('../controllers/debugController')
const RecipesController = require('../controllers/recipesController')

module.exports = (app) => {
  const unauthenticatedRouter = express.Router()
  unauthenticatedRouter.use(setSessionAuthentication())
  unauthenticatedRouter.use(allowAnonymous())
  unauthenticatedRouter.use(authenticate('jwt', 'anonymous'))

  const debugController = new DebugController(app)
  unauthenticatedRouter.get('/debug', debugController.index)

  const applicationController = new ApplicationController(app)
  unauthenticatedRouter.get('/', applicationController.index)

  const recipesController = new RecipesController(app)
  unauthenticatedRouter.get('/recipes', recipesController.index)
  unauthenticatedRouter.get('/recipes/:id', recipesController.show)

  return unauthenticatedRouter
}