const BaseController = require('./baseController')

class ApplicationController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    res.render('pages/index.html.ejs')
  }
}

module.exports = ApplicationController
