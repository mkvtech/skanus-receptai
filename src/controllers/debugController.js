const BaseController = require('./baseController')

class DebugController extends BaseController {
  constructor(options) {
    super(options)
  }

  async index() {
    const { req, res } = this

    res.send({
      ok: 'ok',
      request: {
        params: req.params,
        requestKeys: Object.keys(req),
        requestStriped: {
          authentication: req.authentication,
          anonymous: req.anonymous,
          currentUser: req.currentUser,
        },
      },
      app: {
        models: Object.keys(this.models),
      },
    })
  }
}

module.exports = DebugController
