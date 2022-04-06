const express = require('express')
const { authenticate } = require('@feathersjs/express')

const allowAnonymous = require('../middleware/allowAnonymous')
const setSessionAuthentication = require('../middleware/setSessionAuthentication')

const ApplicationController = require('../controllers/applicationController')
const DebugController = require('../controllers/debugController')
const RecipesController = require('../controllers/recipesController')
const AuthorsRecipesController = require('../controllers/authorsRecipesController')
const NewRecipeController = require('../controllers/newRecipeController')

module.exports = (app) => {
  const unauthenticatedRouter = express.Router()

  const middleware = [setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous')]

  const debugController = new DebugController(app)
  unauthenticatedRouter.get('/debug', middleware, debugController.index)

  const applicationController = new ApplicationController(app)
  unauthenticatedRouter.get('/', middleware, applicationController.index)

  const recipesController = new RecipesController(app)
  unauthenticatedRouter.get('/recipes', middleware, recipesController.index)
  unauthenticatedRouter.get('/recipes/:id', middleware, recipesController.show)

  const authorsRecipesController = new AuthorsRecipesController(app)
  unauthenticatedRouter.get('/authorsrecipes/:id', middleware, authorsRecipesController.index)

  const newRecipeController = new NewRecipeController(app)
  unauthenticatedRouter.get('/newRecipe', middleware, newRecipeController.index)

  return unauthenticatedRouter
}

