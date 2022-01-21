 const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');
 const {Device} = require('./device');


  const Group = sequelize.define(
    'Group',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
)
//Group.hasMany(Device)
Group.belongsToMany(Device, {foreignKey: 'groupeId', through: 'group_device' });
Device.belongsToMany(Group,{foreignKey: 'deviceId', through: 'group_device' })
Group.sync();

module.exports = Group
