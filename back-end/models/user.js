
//Chnaging Models to SQL models using  SEQUELIZE

const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');

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
    type: DataTypes.STRING,
    allowNull:true,
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
User.sync()
module.exports=User



