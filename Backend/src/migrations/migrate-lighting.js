'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lighting', {
      DeviceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      intensity: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lighting');
  }
};