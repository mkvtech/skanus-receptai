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

      include: [
        this.models.users,
        this.models.recipe_ratings,
        {
          model: this.models.comments,
          include: this.models.users,
        },
      ],
    })

    if (recipe) {
      res.render('pages/recipes/show.html.ejs', {
        recipe,
        totalRating: await recipe.getTotalRating(),
        myRating: req.user && recipe.recipe_ratings.find((recipeRating) => recipeRating.userId === req.user.id)?.rating,
        recipesUrl: `${this.utils.fullBaseUrl}/recipes`,
        context: await this.viewContext(req),
      })
    } else {
      res.sendStatus(404)
    }
  }

  rate = async (req, res) => {
    const recipe = await this.models.recipes.findOne({ where: { id: req.params.id } })
    const recipeRating = await this.models.recipe_ratings.findOne({
      where: {
        userId: req.user.id,
        recipeId: req.params.id,
      },
    })

    if (!recipe) {
      res.sendStatus(404)
    } else {
      if (!recipeRating) {
        await this.models.recipe_ratings.create({
          userId: req.user.id,
          recipeId: req.params.id,
          rating: req.body.rating,
        })
      } else {
        await recipeRating.update({ rating: req.body.rating })
      }

      res.send({ newRating: await recipe.getTotalRating() })
    }
  }
}

module.exports = RecipesController
