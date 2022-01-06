const sequelize=require('../config/sequelize')
 const { DataTypes } = require('sequelize');

  const AssociationQuery = sequelize.define(
    'AssociationQuery',
    {
  key: {
    type: DataTypes.STRING,
    allonNull: false,
  },
  info: {
    type: DataTypes.TEXT,
    allonNull: false,
  },

});
AssociationQuery.sync()
module.exports=AssociationQuery

