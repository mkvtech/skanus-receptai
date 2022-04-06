const BaseController = require('./baseController')

class NewRecipeController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    res.render('pages/recipes/newIndex.html.ejs', { context: await this.viewContext(req) })
  }
}

module.exports = NewRecipeController
