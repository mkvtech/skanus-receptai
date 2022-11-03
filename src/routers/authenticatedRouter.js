const express = require('express')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = require('../middleware/setSessionAuthentication')

const DebugController = require('../controllers/debugController')
const RecipesController = require('../controllers/recipesController')
const CommentsController = require('../controllers/commentsController')
const UsersController = require('../controllers/usersController')

module.exports = (app) => {
  const authenticatedRouter = express.Router()

  const middleware = [
    setSessionAuthentication(),
    authenticate('jwt'),
  ]

  const route = (controllerClass, action) => {
    return async (req, res) => {
      const controllerInstance = new controllerClass(app)

      return controllerInstance[action](req, res)
    }
  }
  authenticatedRouter.get('/debug_protected', middleware, route(DebugController, 'index'))
  authenticatedRouter.post('/recipes/:id/rate', middleware, route(RecipesController, 'rate'))
  authenticatedRouter.post('/comments', middleware, route(CommentsController, 'create'))
  authenticatedRouter.get('/users/:id', middleware, route(UsersController, 'show'))

  return authenticatedRouter
}
