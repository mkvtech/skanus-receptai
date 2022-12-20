const BaseController = require('./baseController')

class NewRecipeController extends BaseController {
  constructor(options) {
    super(options)
  }

  async index(req, res) {
    res.render('pages/recipes/newIndex.html.ejs', { context: await this.viewContext(req) })
  }
}

module.exports = NewRecipeController
