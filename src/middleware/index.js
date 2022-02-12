const session = require('express-session')

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  app.use(
    session({
      secret: 'session-secret',
      saveUninitialized: false,
      resave: true,
    })
  )
}
