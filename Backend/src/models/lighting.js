'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lighting.belongsTo(models.Device)
    }
  }
  Lighting.init({
    DeviceId: DataTypes.STRING,
    color: DataTypes.STRING,
    intensity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lighting',
  });
  return Lighting;
};