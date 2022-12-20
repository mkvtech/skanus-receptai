'use strict'

const { recipeRatings } = require('../models')

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await recipeRatings.bulkCreate([
      // userId: 1 recipeRatings
      {
        id: 1,
        userId: 1,
        recipeId: 2,
        rating: 5,
      },
      {
        id: 2,
        userId: 1,
        recipeId: 3,
        rating: 4,
      },
      {
        id: 3,
        userId: 1,
        recipeId: 4,
        rating: 1,
      },

      // userId: 2 recipeRatings
      {
        id: 4,
        userId: 2,
        recipeId: 1,
        rating: 2,
      },
      {
        id: 5,
        userId: 2,
        recipeId: 3,
        rating: 3,
      },
      {
        id: 6,
        userId: 2,
        recipeId: 4,
        rating: 2,
      },

      // userId: 3 recipeRatings
      {
        id: 7,
        userId: 3,
        recipeId: 1,
        rating: 5,
      },

      // userId: 4 recipeRatings
      {
        id: 8,
        userId: 4,
        recipeId: 1,
        rating: 5,
      },
      {
        id: 9,
        userId: 4,
        recipeId: 2,
        rating: 5,
      },
      {
        id: 10,
        userId: 4,
        recipeId: 3,
        rating: 5,
      },
      {
        id: 11,
        userId: 4,
        recipeId: 4,
        rating: 5,
      },

      // userId: 5 recipeRatings
      {
        id: 12,
        userId: 5,
        recipeId: 1,
        rating: 1,
      },
      {
        id: 13,
        userId: 5,
        recipeId: 2,
        rating: 2,
      },
      {
        id: 14,
        userId: 5,
        recipeId: 3,
        rating: 3,
      },
      {
        id: 15,
        userId: 5,
        recipeId: 4,
        rating: 4,
      },
    ])
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipeRatings', null, {})
  },
}
