class ApplicationController {
  constructor(app) {
    this.app = app
  }

  index = async (req, res) => {
    res.render('pages/index.html.ejs')
  }
}

module.exports = ApplicationController
