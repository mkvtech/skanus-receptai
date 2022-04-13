const users = require('./users/users.service.js')
const recipes = require('./recipes/recipes.service.js')
const comments = require('./comments/comments.service.js')
const recipeRatings = require('./recipeRatings/recipeRatings.service.js')

module.exports = function (app) {
  app.configure(users)
  app.configure(recipes)
  app.configure(comments)
  app.configure(recipeRatings)
}
