class DebugController {
  constructor(app) {
    this.app = app
  }

  index = async (req, res) => {
    res.send({
      ok: 'ok',
      request: {
        params: req.params,
        requestKeys: Object.keys(req),
        requestStriped: {
          authentication: req.authentication,
          anonymous: req.anonymous,
          user: req.user,
        },
      },
      app: {
        models: Object.keys(this.app.get('models')),
      },
    })
  }
}

module.exports = DebugController
