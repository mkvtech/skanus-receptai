class AuthorsRecipesController {
  constructor(app) {
    this.app = app
  }

  index = async (req, res) => {
    const recipes = await this.app.get('models').recipes.findAll({ where: { userId: req.user.id } })

    res.render('pages/authorsRecipes/index.html.ejs', { author: req.user, recipes })
  }
}

module.exports = AuthorsRecipesController
