
const sequelize=require('../config/sequelize')
const { DataTypes } = require('sequelize');

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
      
});
Position.sync()
module.exports=Position;