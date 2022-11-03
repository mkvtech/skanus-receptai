const BaseController = require('./baseController')

class ApplicationController extends BaseController {
  constructor(app) {
    super(app)
  }

  async index(req, res) {
    const context = await super.viewContext.call(this, req)

    res.render('pages/index.html.ejs', { context })
  }
}

module.exports = ApplicationController
