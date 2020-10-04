'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reading extends Model {
    static associate(models) {
      Reading.belongsTo(models.Device, {
        foreignKey: {name: 'deviceId', allowNull: false}
      });
    }
  };
  Reading.init({
    deviceId: DataTypes.INTEGER,
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    actuator: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reading',
  });
  return Reading;
};