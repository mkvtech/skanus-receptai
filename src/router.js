const express = require('express')

const ApplicationController = require('./controllers/applicationController')
const DebugController = require('./controllers/debugController')
const RecipesController = require('./controllers/recipesController')
const AuthorsRecipesController = require('./controllers/authorsRecipesController')
const NewRecipeController = require('./controllers/newRecipeController')
const CommentsController = require('./controllers/commentsController')
const UsersController = require('./controllers/usersController')
const AuthenticationController = require('./controllers/authenticationController')

const authentication = require('./middleware/authentication')

module.exports = (app) => {
  const r = express.Router()

  const route = (controllerClass, action) => {
    return async (req, res) => {
      const controllerInstance = new controllerClass({ app, req, res })

      return controllerInstance[action]()
    }
  }

  const optionalAuth = authentication({ required: false })
  const requiredAuth = authentication({ required: true })

  r.get('/', optionalAuth, route(ApplicationController, 'index'))

  r.get('/login', route(AuthenticationController, 'getLogin'))
  r.post('/login', route(AuthenticationController, 'postLogin'))
  r.get('/signup', route(AuthenticationController, 'getSignup'))
  r.post('/signup', route(AuthenticationController, 'postSignup'))
  r.get('/logout', route(AuthenticationController, 'logout'))
  r.get('/currentUser', optionalAuth, route(AuthenticationController, 'getCurrentUser'))

  r.get('/debug', optionalAuth, route(DebugController, 'index'))
  r.get('/debugProtected', requiredAuth, route(DebugController, 'index'))

  r.get('/recipes', optionalAuth, route(RecipesController, 'index'))
  r.get('/recipes/new', requiredAuth, route(RecipesController, 'new'))
  r.get('/recipes/:id', optionalAuth, route(RecipesController, 'show'))
  r.post('/recipes/new', requiredAuth, route(RecipesController, 'create'))
  r.get('/recipes/:id/edit', requiredAuth, route(RecipesController, 'edit'))
  r.post('/recipes/:id/edit', requiredAuth, route(RecipesController, 'update'))
  r.post('/recipes/:id/rate', requiredAuth, route(RecipesController, 'rate'))
  r.post('/recipes/:id/delete', requiredAuth, route(RecipesController, 'delete'))

  r.post('/comments', requiredAuth, route(CommentsController, 'create'))

  r.get('/users/:id', requiredAuth, route(UsersController, 'show'))
  r.get('/users/:id/edit', requiredAuth, route(UsersController, 'edit'))
  r.post('/users/:id/update', requiredAuth, route(UsersController, 'update'))

  r.get('/authorsrecipes/:id', optionalAuth, route(AuthorsRecipesController, 'index'))
  r.get('/newRecipe', optionalAuth, route(NewRecipeController, 'index'))

  return r
}
