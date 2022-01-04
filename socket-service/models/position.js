const sequelize=require('../config/sequelize')
const { DataTypes } = require('sequelize');
const pg=require("pg")

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
      gpsTime:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:new Date().toISOString()
        
        
      }
      
})
Position.belongsTo(Devices, {foreignKey: 'deviceId'});
Position.sync()

module.exports = Position;