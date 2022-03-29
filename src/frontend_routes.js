const path = require('path')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = require('./middleware/setSessionAuthentication')

<<<<<<< HEAD
const createRouter = require('./router')
=======
const { createAuthenticatedRouter, createUnauthenticatedRouter } = require('./routers')
>>>>>>> ec1b8122048da331b92825c90703b39dd5367c8b

module.exports = (app) => {
  const view = (file) => (req, res) => res.sendFile(path.join(app.get('public'), file + '.html'))

  app.get('/home', setSessionAuthentication(), authenticate('jwt'), view('home'))
  app.get('/recipes', setSessionAuthentication(), authenticate('jwt'), view('recipes'))
  app.get('/recipes-example', setSessionAuthentication(), authenticate('jwt'), view('recipes-example'))

<<<<<<< HEAD
  app.use('/', createRouter(app))
=======
  app.use('/', createAuthenticatedRouter(app))
  app.use('/', createUnauthenticatedRouter(app))
>>>>>>> ec1b8122048da331b92825c90703b39dd5367c8b
}
