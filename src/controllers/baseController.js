class BaseController {
  constructor(options) {
    this.app = options.app
    this.req = options.req
    this.res = options.res

    this.request = this.req
    this.response = this.res
    this.currentUser = this.request.currentUser
    this.models = this.app.get('models')
    this.utils = this.app.get('utils')
  }

  viewContext() {
    return {
      app: this.app,
      controller: this,
      currentUser: this.request.currentUser,
    }
  }

  renderPage(page, localVariables = {}) {
    this.response.render(`pages/${page}.html.ejs`, {
      ...localVariables,
      ...this.viewContext(),
    })
  }
}

module.exports = BaseController
