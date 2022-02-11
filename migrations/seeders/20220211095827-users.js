'use strict';

const bcrypt = require('bcrypt');
const { users } = require('../models');

// https://github.com/sequelize/cli/issues/752
const makePassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8));

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await users.bulkCreate([{
      email: 'admin@skanus_receptai.lt',
      password: await makePassword('admin-password'),
    }, {
      email: 'user@skanus_receptai.lt',
      password: await makePassword('password'),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};
