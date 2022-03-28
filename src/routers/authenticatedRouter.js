const express = require('express')
const { authenticate } = require('@feathersjs/express')

const setSessionAuthentication = require('../middleware/setSessionAuthentication')

const DebugController = require('../controllers/debugController')

module.exports = (app) => {
  const authenticatedRouter = express.Router()

  authenticatedRouter.use(setSessionAuthentication())
  authenticatedRouter.use(authenticate('jwt'))

  const debugController = new DebugController(app)
  authenticatedRouter.get('/debug_protected', debugController.index)

  return authenticatedRouter
}
