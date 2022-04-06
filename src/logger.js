const { createLogger, format, transports } = require('winston')

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  level: 'debug',

  format: format.combine(
    format.errors({ stack: true }),
    format.colorize(),
    format.timestamp(),
    format.simple(),
  ),

  transports: [new transports.Console()],
})

module.exports = logger
