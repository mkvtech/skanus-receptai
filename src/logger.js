const { createLogger, format, transports } = require('winston')
const colors = require('colors/safe')

module.exports = (app) => {
  const logger =
    process.env.NODE_ENV === 'test'
      ? createLogger({
          level: 'info',
          format: format.combine(
            //
            format.errors({ stack: true }),
            format.timestamp()
          ),
          transports: [
            new transports.File({
              filename: 'log/test.log',
              level: 'info',
              format: format.combine(
                //
                format.splat(),
                format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}${log.stack ?? ''}`)
              ),
            }),
          ],
        })
      : createLogger({
          level: 'info',
          format: format.combine(
            //
            format.errors({ stack: true }),
            format.timestamp()
          ),
          transports: [
            new transports.File({
              filename: 'log/development.log',
              level: 'info',
              format: format.combine(
                //
                format.splat(),
                format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}${log.stack ?? ''}`)
              ),
            }),

            new transports.Console({
              format: format.combine(
                format.colorize(),

                format.printf((log) => {
                  if (log.type === 'http') {
                    const { req } = log

                    return `\n\n${colors.gray(log.timestamp)} Started ${colors.blue(req.method)} ${colors.blue(
                      req.originalUrl
                    )}`
                  }

                  if (log.type === 'httpDone') {
                    const { req, res } = log
                    const { statusCode } = res

                    const color = statusCode >= 500 ? 'red' : statusCode >= 400 ? 'blue' : 'green'

                    return `${colors.gray(log.timestamp)} Done ${req.method} ${req.originalUrl} with ${colors[color](
                      res.statusCode
                    )} ${colors.gray(`(${log.executionTime} ms)`)}`
                  }

                  if (log.type === 'sql') {
                    const { message } = log
                    const color = message.startsWith('SELECT')
                      ? 'blue'
                      : message.startsWith('INSERT') || message.startsWith('UPDATE')
                      ? 'green'
                      : message.startsWith('DELETE')
                      ? 'red'
                      : 'white'

                    return `${colors.gray(log.timestamp)} ${colors[color](log.message)}`
                  }

                  const stack = log.stack
                    ? '\n' +
                      log.stack
                        .split('\n')
                        .map((line) => (line.includes('node') ? colors.dim.red(line) : colors.red(line)))
                        .join('\n')
                    : ''

                  // Default, similar to format.simple()
                  return `${colors.gray(log.timestamp)} ${log.level}: ${log.message}${stack}`
                })
              ),
            }),
          ],
        })

  app.set('logger', logger)
}
