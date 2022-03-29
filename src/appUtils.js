module.exports = (app) => {
  app.set('utils', {
    fullBaseUrl: `http://${app.get('host')}:${app.get('port')}`,
  })
}
