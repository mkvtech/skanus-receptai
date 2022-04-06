'use strict'

const { recipes } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await recipes.bulkCreate([
      {
        id: 1,
        title: 'First Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        userId: 1,
      },
      {
        id: 7,
        title: 'Some Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        userId: 1,
      },
      {
        id: 2,
        title: 'Second Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        userId: 2,
      },
      {
        id: 3,
        title: 'Third Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        userId: 2,
      },
      {
        id: 4,
        title: 'Fourth Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        userId: 2,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {})
  },
}
