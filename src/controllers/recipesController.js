const BaseController = require("./baseController")

class RecipesController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    const recipes = await this.models.recipes.findAll()

    res.render('pages/recipes/index.html.ejs', { recipes })
  }

  show = async (req, res) => {
    const recipe = await this.models.recipes.findOne({
      where: {
        id: req.params.id,
      },
      include: this.models.users
    })

    res.render('pages/recipes/show.html.ejs', {
      recipe,
      recipesUrl: `${this.utils.fullBaseUrl}/recipes`
    })
  }
}

module.exports = RecipesController
