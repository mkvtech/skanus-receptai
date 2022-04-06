const BaseController = require("./baseController")

class AuthorsRecipesController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    const recipes = await this.models.recipes.findAll({
      where: {
        id: req.params.id,
      },
      include: this.models.users,
    })

    const author = await this.models.users.findOne({
      where: {
        id: req.params.id,
      },
    })

    res.render('pages/authorsRecipes/index.html.ejs', {
      recipes,
      author,
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
      res.render('pages/authorsRicpes/index.html.ejs', {
        recipe,
        recipesUrl: `${this.utils.fullBaseUrl}/authorsrecipes`,
        context: await this.viewContext(req),
      })
    } else {
      res.sendStatus(404)
    }
  }
}

module.exports = AuthorsRecipesController