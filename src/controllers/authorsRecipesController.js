const BaseController = require("./baseController")

class AuthorsRecipesController extends BaseController {
  constructor(app) {
    super(app)
  }

  index = async (req, res) => {
    const recipes = await this.models.recipes.findAll({
      where: {
        userId: req.params.id,
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
}

module.exports = AuthorsRecipesController