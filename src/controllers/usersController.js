const ValidationResult = require('../utils/ValidationResult')
const BaseController = require('./baseController')

class UsersController extends BaseController {
  constructor(options) {
    super(options)
  }

  async show() {
    const userId = this.request.params.id

    const user = await this.models.users.findByPk(userId)
    const comments = await this.models.comments.findAll({
      where: { userId },
      include: [this.models.users],
    })

    this.renderPage('users/show', { comments, user })
  }

  async edit() {
    const { request } = this

    if (request.currentUser.id != request.params.id) {
      // TODO: return 'forbidden'
      return request.end('forbidden')
    }

    this.renderPage('users/edit', {
      user: await this.models.users.findByPk(request.params.id),
      validation: ValidationResult.empty(),
    })
  }

  async update() {
    const { request } = this
    const userId = request.params.id

    if (request.currentUser.id != userId) {
      // TODO: return 'forbidden'
      request.halt(0)
      return
    }

    const user = await this.models.users.findByPk(request.params.id)

    try {
      await user.update({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
      })

      this.response.redirect(`/users/${user.id}`)
    } catch (error) {
      if (error.name !== 'SequelizeValidationError') {
        throw error
      }

      this.renderPage('users/edit', { user, validation: ValidationResult.fromSequelize(error) })
    }
  }
}

module.exports = UsersController
