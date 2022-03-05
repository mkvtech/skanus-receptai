const path = require('path')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = (req, res, next) => {
  req.authentication = req.session.authentication
  next()
}

module.exports = (app) => {
  const view = (file) => (req, res) => res.sendFile(path.join(app.get('public'), file + '.html'))

  app.get('/debug', setSessionAuthentication, authenticate('jwt'), view('debug'))
  app.get('/home', setSessionAuthentication, authenticate('jwt'), view('home'))
  app.get('/recipes', setSessionAuthentication, authenticate('jwt'), view('recipes'))
  app.get('/recipes-example', setSessionAuthentication, authenticate('jwt'), view('recipes-example'))

  app.get('/test', (req, res) => res.render('pages/index.html.ejs'))
}
