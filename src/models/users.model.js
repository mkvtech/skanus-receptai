// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const users = sequelizeClient.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
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

  users.associate = function (models) {
    users.hasMany(models.recipes, { foreignKey: { allowNull: false } })
    users.hasMany(models.comments, { foreignKey: { allowNull: false } })
    users.hasMany(models.recipe_ratings, { foreignKey: { allowNull: false } })
  }

  users.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  }

  return users
}
