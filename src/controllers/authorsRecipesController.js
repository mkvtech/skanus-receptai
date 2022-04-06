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
<<<<<<< HEAD
=======

  
>>>>>>> bda072e24778aa369c6991360b637bd91c162cb8
}

module.exports = AuthorsRecipesController