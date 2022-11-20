// Loggin middleware
module.exports = (app) => {
  const logger = app.get('logger')

  app.use((req, res, next) => {
    const startTime = performance.now()

    logger.info(`Started ${req.method} ${req.originalUrl}`, {
      type: 'http',
      req: {
        method: req.method,
        originalUrl: req.originalUrl,
      },
    })

    res.on('finish', () => {
      const endTime = performance.now()
      const executionTime = Math.round(endTime - startTime)

      logger.info(`Done ${req.method} ${req.originalUrl} with ${res.statusCode} (${executionTime} ms)`, {
        type: 'httpDone',
        req: {
          method: req.method,
          originalUrl: req.originalUrl,
        },
        res: {
          statusCode: res.statusCode,
        },
        executionTime,
      })
    })

    next()
  })
}
