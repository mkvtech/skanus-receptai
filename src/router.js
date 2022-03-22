const express = require('express')
const { authenticate } = require('@feathersjs/express')

const allowAnonymous = require('./middleware/allowAnonymous')
const setSessionAuthentication = require('./middleware/setSessionAuthentication')

const router = express.Router()

const debugController = require('./controllers/debugController')
router.get('/debug', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), debugController.show)
router.get('/debug_protected', setSessionAuthentication(), authenticate('jwt'), debugController.show)

const applicationController = require('./controllers/applicationController')
router.get('/', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), applicationController.index)

const authorsRecipesController = require('./controllers/authorsRecipesController')
router.get('/author', setSessionAuthentication(), allowAnonymous(), authenticate('jwt', 'anonymous'), authorsRecipesController.index)

module.exports = router
