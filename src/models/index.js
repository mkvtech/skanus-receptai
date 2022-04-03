// This file initializes models and associations
// To access all models use `app.get('models')`
// Ex. to get `users` models: `app.get('models').users`

const modelCreators = [
  require('./users.model.js'),
  require('./recipes.model.js'),
  require('./comments.model.js'),
  require('./recipeRatings.model.js'),
]

const defineModels = (app) => {
  const models = {}

  modelCreators.forEach((createModel) => {
    const model = createModel(app)
    models[model.name] = model
  })

  return models
}

const defineAssociations = (models) => {
  Object.values(models).forEach((model) => model.associate(models))
}

module.exports = function (app) {
  const models = defineModels(app)

  defineAssociations(models)

  app.set('models', models)
}
