// Initializes the `recipes` service on path `/recipes`
const { Recipes } = require('./recipes.class');
const createModel = require('../../models/recipes.model');
const hooks = require('./recipes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipes', new Recipes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipes');

  service.hooks(hooks);
};
