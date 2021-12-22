
  const sequelize=require('../config/sequelize')
  const { DataTypes } = require('sequelize');


  const Organization = sequelize.define(
    'Organization',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      

})

Organization.sync()

module.exports=Organization
