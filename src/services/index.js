const users = require('./users/users.service.js');
const recipes = require('./recipes/recipes.service.js');
const comments = require('./comments/comments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(recipes);
  app.configure(comments);
};
