const sequelize=require('../config/sequelize')
const { DataTypes } = require('sequelize');

const Devices=sequelize.define('Devices');
const Position = sequelize.define('Position',
{
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
})
Position.belongsTo(Devices, {foreignKey: 'deviceId'});
Position.sync()

module.exports = Position;