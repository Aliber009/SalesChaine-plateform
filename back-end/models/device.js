const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');
 const Organization = require('./organization');

//const Group = require('./group');


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
//One to one 

Device.belongsTo(Organization, {foreignKey: 'organization'});

//One to many : check Groupe has many => check groups

   


Device.sync()
module.exports=Device
