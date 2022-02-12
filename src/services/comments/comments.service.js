// Initializes the `comments` service on path `/comments`
const { Comments } = require('./comments.class');
const createModel = require('../../models/comments.model');
const hooks = require('./comments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/comments', new Comments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/comments');

  service.hooks(hooks);
};
