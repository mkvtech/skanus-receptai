const BaseController = require("./baseController")

class UsersController extends BaseController {
  constructor(app) {
    super(app)
  }

  show = async (req, res) => {
    const comments = await this.models.comments.findAll({
      where: {
        userId: req.params.id
      },

      include: [
        this.models.users,
      ]
    })
    res.render('pages/users/show.html.ejs', {
      context: await this.viewContext(req),
      comments,
    })
  }
}

module.exports = UsersController
