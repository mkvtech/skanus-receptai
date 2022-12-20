const { pick } = require('lodash')
const ValidationResult = require('../utils/ValidationResult')
const BaseController = require('./baseController')

class RecipesController extends BaseController {
  constructor(options) {
    super(options)
  }

  async index() {
    const recipes = await this.models.recipes.findAll({
      include: [{ model: this.models.users }, { model: this.models.recipeRatings }],
    })

    recipes.forEach((recipe) => recipe.calculateAverageRating())

    this.renderPage('recipes/index', { recipes })
  }

  async show() {
    const { request } = this
    const recipe = await this.models.recipes.findOne({
      where: {
        id: request.params.id,
      },

      include: [
        this.models.users,
        this.models.recipeRatings,
        {
          model: this.models.comments,
          include: this.models.users,
        },
      ],
      order: [[this.models.comments, 'createdAt', 'DESC']],
    })

    if (recipe) {
      this.renderPage('recipes/show', {
        recipe,
        totalRating: await recipe.getTotalRating(),
        myRating:
          request.currentUser &&
          recipe.recipeRatings.find((recipeRating) => recipeRating.userId === request.currentUser.id)?.rating,
      })
    } else {
      this.response.sendStatus(404)
    }
  }

  async rate() {
    const { request, response } = this
    const recipe = await this.models.recipes.findOne({ where: { id: request.params.id } })
    const recipeRating = await this.models.recipeRatings.findOne({
      where: {
        userId: request.currentUser.id,
        recipeId: request.params.id,
      },
    })

    if (!recipe) {
      response.sendStatus(404)
    } else {
      if (!recipeRating) {
        await this.models.recipeRatings.create({
          userId: request.currentUser.id,
          recipeId: request.params.id,
          rating: request.body.rating,
        })
      } else {
        await recipeRating.update({ rating: request.body.rating })
      }

      response.send({ newRating: await recipe.getTotalRating() })
    }
  }

  async new() {
    this.renderPage('recipes/new', {
      recipe: this.models.recipes.build(),
      validation: ValidationResult.empty(),
    })
  }

  async create() {
    const params = pick(this.req.body, 'title', 'description', 'ingredients', 'type')
    const recipe = this.models.recipes.build({ ...params, userId: this.req.currentUser.id })

    try {
      await recipe.save()

      this.res.redirect(`/recipes/${recipe.id}`)
    } catch (error) {
      if (error.name !== 'SequelizeValidationError') {
        throw error
      }

      this.renderPage('recipes/new', {
        recipe,
        validation: ValidationResult.fromSequelize(error),
      })
    }
  }

  async edit() {
    const recipe = await this.models.recipes.findByPk(this.request.params.id)

    if (recipe.userId != this.request.currentUser.id) {
      return this.response.status(403)
    }

    this.renderPage('recipes/edit', { recipe, validation: ValidationResult.empty() })
  }

  async update() {
    const { request, response } = this
    const recipe = await this.models.recipes.findByPk(request.params.id)

    if (recipe.userId != request.currentUser.id) {
      return response.status(403)
    }

    const params = pick(request.body, 'title', 'description', 'ingredients', 'type')
    recipe.set(params)

    try {
      await recipe.save()

      response.redirect(`/recipes/${recipe.id}`)
    } catch (error) {
      if (error.name !== 'SequelizeValidationError') {
        throw error
      }

      this.renderPage('recipe/edit', { recipe, validation: ValidationResult.fromSequelize(error) })
    }
  }
}

module.exports = RecipesController
