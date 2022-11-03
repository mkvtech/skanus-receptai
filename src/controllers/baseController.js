class BaseController {
  constructor(app) {
    this.app = app
    this.models = this.app.get('models')
    this.utils = this.app.get('utils')
  }

  async viewContext(request) {
    return {
      app: this.app,
      controller: this,
      ...(request.user && { currentUser: await this.models.users.findByPk(request.user.id) }),
      request,
    }
  }
}

module.exports = BaseController
