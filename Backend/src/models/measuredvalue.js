'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeasuredValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MeasuredValue.belongsTo(models.Sensor);
    }
  }
  MeasuredValue.init({
    timestamp: DataTypes.DATE,
    SensorId: DataTypes.STRING,
    value: DataTypes.INTEGER,
    isBelowLowerBound: DataTypes.BOOLEAN,
    isAboveUpperBound: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MeasuredValue',
  });
  return MeasuredValue;
};