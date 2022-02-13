const path = require('path')

module.exports = (app) => {
  app.get('/login', (req, res) => res.sendFile(path.join(app.get('public'), 'login.html')))

  app.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { accessToken } = await app.service('api/authentication').create({
        strategy: 'local',
        email,
        password,
      })

      req.session.authentication = {
        strategy: 'jwt',
        accessToken,
      }

      res.redirect('/home')
    } catch (error) {
      next(error)
    }
  })

  app.get('/jwt', (req, res) => {
    res.send(req.session.authentication.accessToken)
  })

  app.get('/logout', (req, res) => {
    delete req.session.authentication
    res.end('You are now logged out')
  })
}
