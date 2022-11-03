// Initializes the `RecipeRatings` service on path `/recipe-ratings`
const { RecipeRatings } = require('./recipeRatings.class')
const hooks = require('./recipeRatings.hooks')

module.exports = function (app) {
  const options = {
    Model: app.get('models').recipe_ratings,
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/api/recipe-ratings', new RecipeRatings(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('/api/recipe-ratings')

  service.hooks(hooks)
}
