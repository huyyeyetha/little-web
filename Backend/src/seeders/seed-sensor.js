'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('Sensor', [
			{id: 'anhsang', name: 'Cảm biến 1', unit: 'lux', description: 'Đo cường độ ánh sáng', GardenId: 1},
			{id: 'doamdat', name: 'Cảm biến 2', unit: '%', description: 'Đo độ ẩm đất', GardenId: 1},
			{id: 'doamkk', name: 'Cảm biến 3', unit: '%', description: 'Đo độ ẩm không khí', GardenId: 1},
			{id: 'nhietdo', name: 'Cảm biến 4', unit: '°C', description: 'Đo nhiệt độ', GardenId: 1}
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('Sensor', null, {});
  	}
};
