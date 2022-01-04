
//Chnaging Models to SQL models using  SEQUELIZE

const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');
// const User_user_device = require('./User_user_device');
const Device = require('./device');
const { values } = require('sequelize/lib/operators');

 

const User = sequelize.define(
    'User',
    {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM({values:['USER','SYSADMIN','ADMIN','OWNER']}),
    allowNull:true,
    defaultValue:'USER'
  },
  company:{
    type: DataTypes.STRING,
    allowNull:true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountConfirmation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  resetPass: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  
});

UserDevice = sequelize.define('user_user_device', {
  giverId: DataTypes.INTEGER
});
//User device many to many to get associations with other devices
User.belongsToMany(User, { as: 'associated', foreignKey: 'giverId', through: UserDevice });
User.belongsToMany(Device, { through: UserDevice })
User.belongsToMany(User, { as: 'parents', foreignKey: 'UserId', through: UserDevice });
Device.belongsToMany(User, { through: UserDevice })
//may to many user-device to get the creators only 
User.belongsToMany(Device, {as:"OwnerDevice", through: 'User_Device' });
Device.belongsToMany(User, { through: 'User_Device' })

sequelize.sync();
module.exports=User



