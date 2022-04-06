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

  create = async (req, res) => {
    const comment = await this.models.comments.create({
      userId: req.user.id,
      recipeId: req.body.recipeId,
      text: req.body.text,
      rating: 0,
    })
    res.redirect("recipes/" + req.body.recipeId)
  }

}

module.exports = RecipesController
