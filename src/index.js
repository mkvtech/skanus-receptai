const app = require('./app')
const port = app.get('port')
const server = app.listen(port)

const logger = app.get('logger')

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason))

server.on('listening', () => logger.info(`Feathers application started on ${app.get('utils').fullBaseUrl}`))
