// Initializes the `comment` service on path `/comment`
const { Comments } = require('./comments.class');
const createModel = require('../../models/comments.model');
const hooks = require('./comments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comment', new Comments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment');

  service.hooks(hooks);
};
