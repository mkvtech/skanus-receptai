const path = require('path')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = require('./middleware/setSessionAuthentication')

const router = require('./router')

module.exports = (app) => {
  const view = (file) => (req, res) => res.sendFile(path.join(app.get('public'), file + '.html'))

  app.get('/home', setSessionAuthentication(), authenticate('jwt'), view('home'))
  app.get('/recipes', setSessionAuthentication(), authenticate('jwt'), view('recipes'))
  app.get('/recipes-example', setSessionAuthentication(), authenticate('jwt'), view('recipes-example'))

  app.use('/', router)
}
