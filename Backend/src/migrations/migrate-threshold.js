'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Threshold', {
      SensorId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lowerBound: {
        type: Sequelize.INTEGER
      },
      upperBound: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Threshold');
  }
};