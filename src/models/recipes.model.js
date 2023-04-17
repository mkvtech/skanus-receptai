// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const recipes = sequelizeClient.define(
    'recipes',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'negali būti tuščias' },
          notEmpty: { msg: 'negali būti tuščias' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'negali būti tuščias' },
          notEmpty: { msg: 'negali būti tuščias' },
        },
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'negali būti tuščias' },
          notEmpty: { msg: 'negali būti tuščias' },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'negali būti tuščias' },
          notEmpty: { msg: 'negali būti tuščias' },
        },
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true
        },
      },
    }
  )

  recipes.associate = function (models) {
    recipes.belongsTo(models.users, { foreignKey: { allowNull: false } })
    recipes.hasMany(models.comments, { foreignKey: { allowNull: false } })
    recipes.hasMany(models.recipeRatings, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  recipes.prototype.generatePageLink = function () {
    return `${app.get('utils').fullBaseUrl}/recipes/${this.id}`
  }

  recipes.prototype.calculateAverageRating = function () {
    const { recipeRatings } = this

    const length = recipeRatings.length
    const averageRating = length ? recipeRatings.reduce((acc, current) => acc + current.rating, 0) / length : 0

    this.averageRating = averageRating

    return averageRating
  }

  recipes.prototype.getTotalRating = async function () {
    const myRecipeRatings = await this.getRecipeRatings()

    if (!myRecipeRatings.length) {
      return 0
    }

    const sum = myRecipeRatings.reduce((accumulator, current) => accumulator + current.rating, 0)

    return sum / myRecipeRatings.length
  }

  recipes.prototype.canDelete = function (user) {
    return user && (user.id === this.userId || user.email === 'admin@skanus_receptai.lt')
  }

  return recipes
}
