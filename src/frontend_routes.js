const path = require('path')

module.exports = (app) => {
  const view = (file) => (req, res) => res.sendFile(path.join(app.get('public'), file + '.html'))

  app.get('/login', view('login'))
  app.get('/recipes', view('recipes'))
}
