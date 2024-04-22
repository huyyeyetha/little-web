'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OperationLog', {
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      DeviceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.BOOLEAN
      },
      isAppliedThreshold: {
        type: Sequelize.BOOLEAN
      },
      isAppliedSchedule: {
        type: Sequelize.BOOLEAN
      },
      operatedBy: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OperationLog');
  }
};