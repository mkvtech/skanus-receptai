const BaseController = require("./baseController")

class RecipesController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    const recipes = await this.models.recipes.findAll({
      include: this.models.users,
    })

    res.render('pages/recipes/index.html.ejs', {
      recipes,
      context: await this.viewContext(req),
    })
  }

  show = async (req, res) => {
    const recipe = await this.models.recipes.findOne({
      where: {
        id: req.params.id,
      },
      include: this.models.users
    })

    if (recipe) {
      res.render('pages/recipes/show.html.ejs', {
        recipe,
        recipesUrl: `${this.utils.fullBaseUrl}/recipes`,
        context: await this.viewContext(req),
      })
    } else {
      res.sendStatus(404)
    }
  }
}

module.exports = RecipesController
