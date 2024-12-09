'use strict';

const { hashPass } = require('../helpers/hash');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const data = await require('../data/user.json').map(element=>{
      element.createdAt = element.updatedAt = new Date();
      element.password = hashPass(element.password);

      return element;
    })
   await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
  }
};
