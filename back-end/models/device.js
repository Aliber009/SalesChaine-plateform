const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');
 const Organization = require('./organization')

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
      },
     

})
Device.belongsTo(Organization, {foreignKey: 'organization'});
Device.sync()
module.exports=Device
