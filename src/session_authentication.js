const path = require('path')
const { authenticate } = require('@feathersjs/express')
const bcrypt = require('bcrypt')

const BCRYPT_GEN_SALT = 8

function encryptPassword(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(BCRYPT_GEN_SALT))
}

function setAuthenticationFromSession(req, res, next) {
  req.authentication = req.session.authentication
  next()
}

module.exports = (app) => {
  const afterLoginRedirect = app.get('other').afterLoginRedirect
  const afterSignupRedirect = app.get('other').afterSignupRedirect

  app.get('/login', (req, res) => res.sendFile(path.join(app.get('public'), 'login.html')))
  app.get('/signup', (req, res) => res.sendFile(path.join(app.get('public'), 'signup.html')))

  app.post('/signup', async (req, res, next) => {
    try {
      const users = app.get('sequelizeClient').models.users
      const { firstName, lastName, email, password } = req.body
      const passwordHash = await encryptPassword(password)
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

      res.redirect(afterLoginRedirect)
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

      res.redirect(afterSignupRedirect)
    } catch (error) {
      next(error)
    }
  })

  app.get('/jwt', setAuthenticationFromSession, authenticate('jwt'), (req, res) => {
    res.send(req.session.authentication.accessToken)
  })

  app.get('/currentUser', setAuthenticationFromSession, authenticate('jwt'), (req, res) => {
    res.send({ currentUser: req.user })
  })

  app.get('/logout', (req, res) => {
    delete req.session.authentication
    res.redirect('/')
  })
}
