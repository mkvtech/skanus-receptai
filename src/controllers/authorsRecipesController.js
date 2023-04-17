const BaseController = require('./baseController')

class AuthorsRecipesController extends BaseController {
  constructor(options) {
    super(options)
  }

  async index() {
    const userId = this.request.params.id

    const recipes = await this.models.recipes.findAll({
      where: { userId },
      include: [{ model: this.models.users }, { model: this.models.recipeRatings }],
    })

    recipes.forEach((recipe) => recipe.calculateAverageRating())

    const author = await this.models.users.findOne({ where: { id: userId } })

    this.renderPage('authorsRecipes/index', { recipes, author })
  }
}

module.exports = AuthorsRecipesController
