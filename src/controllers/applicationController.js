const BaseController = require('./baseController')

class ApplicationController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    res.render('pages/index.html.ejs', { context: await this.viewContext(req) })
  }
}

module.exports = ApplicationController
