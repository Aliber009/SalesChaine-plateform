//Chnaging Models to SQL models using  SEQUELIZE

const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');

  const ActiveSession = sequelize.define(
    'ActiveSession',
    {
  token: {
    type: DataTypes.TEXT,
    allonNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allonNull: false,
  },

});
ActiveSession.sync()
module.exports=ActiveSession

