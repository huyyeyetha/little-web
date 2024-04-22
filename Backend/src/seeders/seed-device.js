'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('Device', [
			{id: 'den', name: 'Đèn led RGB', isAppliedThreshold: true, isAppliedSchedule: false, GardenId: 1},
			{id: 'maybom', name: 'Động cơ bơm nước', isAppliedThreshold: true, isAppliedSchedule: false, GardenId: 1},
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('Device', null, {});
  	}
};
