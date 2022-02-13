const path = require('path')
const { authenticate } = require('@feathersjs/express')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.get('/login', (req, res) => res.sendFile(path.join(app.get('public'), 'login.html')))
  app.get('/signup', (req, res) => res.sendFile(path.join(app.get('public'), 'signup.html')))

  app.post('/signup', async (req, res, next) => {
    try {
      const users = app.get('sequelizeClient').models.users
      const { firstName, lastName, email, password } = req.body
      const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8))
      await users.create({ firstName, lastName, email, password: passwordHash })

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

  app.get(
    '/jwt',
    (req, res, next) => {
      req.authentication = req.session.authentication
      next()
    },
    authenticate('jwt'),
    (req, res) => {
      res.send(req.session.authentication.accessToken)
    }
  )

  app.get('/logout', (req, res) => {
    delete req.session.authentication
    res.end('You are now logged out')
  })
}
