const path = require('path')
const { authenticate } = require('@feathersjs/express')
const bcrypt = require('bcrypt')

module.exports = (a) => {
  const afterLoginRedirect = a.get('other').afterLoginRedirect
  const afterSignupRedirect = a.get('other').afterSignupRedirect

  a.get('/login', (req, res) => res.sendFile(path.join(a.get('public'), 'login.html')))
  a.get('/signup', (req, res) => res.sendFile(path.join(a.get('public'), 'signup.html')))

  a.post('/signup', async (req, res, next) => {
    try {
      const users = a.get('sequelizeClient').models.users
      const { firstName, lastName, email, password } = req.body
      const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8))
      await users.create({ firstName, lastName, email, password: passwordHash })

      const { accessToken } = await a.service('api/authentication').create({
        strategy: 'local',
        email,
        password,
      })

      req.session.authentication = {
        strategy: 'jwt',
        accessToken,
      }

      res.redirect(afterLoginRedirect)
    } catch (e) {
      next(e)
    }
  })

  a.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { accessToken } = await a.service('api/authentication').create({
        strategy: 'local',
        email,
        password,
      })

      req.session.authentication = {
        strategy: 'jwt',
        accessToken,
      }

      res.redirect(afterSignupRedirect)
    } catch (error) {
      next(error)
    }
  })

  a.get(
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

  a.get(
    '/currentUser',
    (req, res, next) => {
      req.authentication = req.session.authentication
      next()
    },
    authenticate('jwt'),

    (req, res) => {
      res.send({ currentUser: req.user })
    }
  )

  a.get('/logout', (req, res) => {
    delete req.session.authentication
    res.end('You are now logged out')
  })
}
