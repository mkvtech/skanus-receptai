const BaseController = require('./baseController')

class CommentsController extends BaseController {
  constructor(options) {
    super(options)
  }

  async create() {
    const { req, res } = this
    await this.models.comments.create({
      userId: this.currentUser.id,
      recipeId: req.body.recipeId,
      text: req.body.text,
      rating: 0,
    })

    res.redirect('recipes/' + req.body.recipeId)
  }
}

module.exports = CommentsController
