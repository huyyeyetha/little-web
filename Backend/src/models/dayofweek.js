'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayOfWeek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DayOfWeek.belongsTo(models.Schedule)
    }
  }
  DayOfWeek.init({
    day: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DayOfWeek',
  });
  return DayOfWeek;
};