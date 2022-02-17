// Initializes the `recipes` service on path `/recipes`
const { Recipes } = require('./recipes.class')
const hooks = require('./recipes.hooks')

module.exports = function (app) {
  const options = {
    Model: app.get('models').recipes,
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/api/recipes', new Recipes(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('api/recipes')

  service.hooks(hooks)
}
