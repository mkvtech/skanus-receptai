const BaseController = require('./baseController')

class ApplicationController extends BaseController {
  constructor(options) {
    super(options)
  }

  index() {
    this.renderPage('index')
  }
}

module.exports = ApplicationController
