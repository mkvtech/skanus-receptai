const path = require('path')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = (req, res, next) => {
  req.authentication = req.session.authentication
  next()
}

module.exports = (app) => {
  const view = (file) => (req, res) => res.sendFile(path.join(app.get('public'), file + '.html'))

  app.get('/recipes-example', setSessionAuthentication, authenticate('jwt'), view('recipes-example'))
}
