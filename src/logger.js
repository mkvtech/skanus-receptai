const { createLogger, format, transports } = require('winston')

const removeFields = format((info, opts) => {
  if (opts) {
    opts.forEach(field => {
      delete info[field]
    })
  }

  return info
})

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  level: 'debug',

  format: format.combine(

    // Feathersjs 'hook' field in log has too much data to log
    removeFields(['hook']),

    format.errors({ stack: true }),
    // format.colorize(), // TODO: Colorize output
    format.timestamp(),
    format.prettyPrint(),
  ),

  transports: [new transports.Console()],
})

module.exports = logger
