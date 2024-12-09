'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = await require('../data/product.json').map(element=>{
      element.createdAt = element.updatedAt = new Date();

      return element;
    })
   await queryInterface.bulkInsert('Products', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null);
  }
};
