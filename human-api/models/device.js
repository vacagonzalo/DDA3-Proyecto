'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      Device.hasMany(models.Reading);
    }
  };
  Device.init({
    name: {type: DataTypes.STRING, allowNull:false, unique:true}
  }, {
    sequelize,
    modelName: 'Device',
    timestamps: true,
    paranoid: true
  });
  return Device;
};