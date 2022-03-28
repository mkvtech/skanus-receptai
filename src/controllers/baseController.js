class BaseController {
  constructor(app) {
    this.app = app
    this.models = this.app.get('models')
    this.utils = this.app.get('utils')
  }
}

module.exports = BaseController
