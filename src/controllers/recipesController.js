class RecipesController {
  constructor(app) {
    this.app = app
  }

  index = async (req, res) => {
    const recipes = await this.app.get('models').recipes.findAll()

    res.render('pages/recipes/index.html.ejs', { author: req.user, recipes })
  }
}

module.exports = RecipesController
