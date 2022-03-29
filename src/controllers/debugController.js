const BaseController = require('./baseController')

class DebugController extends BaseController {
  constructor(app) {
    super(app)
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
        models: Object.keys(this.models),
      },
    })
  }
}

module.exports = DebugController
