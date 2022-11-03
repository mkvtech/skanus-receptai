const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  app.use(
    session({
      secret: 'session-secret',
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
      store: new SQLiteStore({ table: 'sessions', db: 'sessions.sqlite', dir: '.' }),
      name: 'skanus-receptai-session-id',
    })
  )
}
