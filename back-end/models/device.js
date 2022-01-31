const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');
 const Organization = require('./organization');

//const Group = require('./group');

//Positions to get last positions from devices : 
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
      },
      Attributes:{
        type: DataTypes.TEXT,
        allonNull: true,
      },
      
})

  const Device = sequelize.define(
    'Device',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imei: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
     

})
//One to one 
Position.belongsTo(Device, {foreignKey: 'deviceId'});
Device.belongsTo(Organization, {foreignKey: 'organization'});

//One to many : check Groupe has many => check groups

   


Device.sync()
module.exports={Device,Position}
