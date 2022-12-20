const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')

const authentication = require('./middleware/authentication')

const sequelize = require('./sequelize')
const models = require('./models')

const appUtils = require('./appUtils')
const createRouter = require('./router')

require('express-async-errors')

const app = express(feathers())

const loggerConfiguration = require('./logger')
app.configure(loggerConfiguration)

const loggingMiddleware = require('./middleware/logger')
app.configure(loggingMiddleware)

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
app.use(cookieParser())

// Host the public folder
app.use('/', express.static(__dirname + '/../public'))
app.use('/dist', express.static(__dirname + '/../dist'))

// TODO: Fix/remove with js bundler
app.get('/scripts/tw-elements.min.js', (req, res) =>
  res.sendFile(path.resolve(__dirname + '/../node_modules/tw-elements/dist/js/index.min.js'))
)

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.set('view engine', 'ejs')

app.configure(sequelize)
app.configure(models)

app.configure(appUtils)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)
// Set up our services (see `services/index.js`)
app.configure(services)

app.use('/', createRouter(app))

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger: app.get('logger') }))

app.hooks(appHooks)

module.exports = app
