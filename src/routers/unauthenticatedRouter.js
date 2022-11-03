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

  const route = (controllerClass, action) => {
    return async (req, res) => {
      const controllerInstance = new controllerClass(app)

      return controllerInstance[action](req, res)
    }
  }

  unauthenticatedRouter.get('/debug', middleware, route(DebugController, 'index'))
  unauthenticatedRouter.get('/', middleware, route(ApplicationController, 'index'))
  unauthenticatedRouter.get('/recipes', middleware, route(RecipesController, 'index'))
  unauthenticatedRouter.get('/recipes/:id', middleware, route(RecipesController, 'show'))
  unauthenticatedRouter.get('/authorsrecipes/:id', middleware, route(AuthorsRecipesController, 'index'))
  unauthenticatedRouter.get('/newRecipe', middleware, route(NewRecipeController, 'index'))

  return unauthenticatedRouter
}
