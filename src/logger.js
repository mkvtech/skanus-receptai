const { createLogger, format, transports } = require('winston')

const removeFields = format((info, opts) => {
  if (opts) {
    opts.forEach(field => {
      delete info[field]
    })
  }

  return info
})

const skipLogWithCodes = format((info, opts) => {
  if (info.code && Array.isArray(opts)) {
    if (opts.some((codeRegexp) => codeRegexp.test('' + info.code))) {
      return null
    }
  }

  return info
})

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  level: 'debug',

  format: format.combine(...[

    // When in test mode, skip 401 and 404 logs
    ...process.env.NODE_ENV === 'test' ? [skipLogWithCodes([/4../])] : [],

    // Feathersjs 'hook' field in log has too much data to log
    removeFields(['hook']),

    format.errors({ stack: true }),
    // format.colorize(), // TODO: Colorize output
    format.timestamp(),
    format.prettyPrint(),
  ]),

  transports: [new transports.Console()],
})

module.exports = logger
