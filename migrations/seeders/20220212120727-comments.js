'use strict'

const { comments } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await comments.bulkCreate([
      {
        id: 1,
        recipeId: 1,
        userId: 3,
        text: 'Nice recipe!',
        rating: 5,
      },

      {
        id: 2,
        recipeId: 1,
        userId: 4,
        text: 'Bad recipe!',
        rating: 1,
      },

      {
        id: 3,
        recipeId: 2,
        userId: 5,
        text: 'Nice recipe!',
        rating: 5,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {})
  },
}
