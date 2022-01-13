
const ActiveSession = require('../models/activeSession');
const AssociationQuery = require('../models/associationQuery');
const User = require('../models/user');
const {Op}=require('sequelize')

module.exports = {
  tokensCleanUp: async function() {
    const d = new Date();
    const date =new Date( d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 )); // fixing GMT+1
    const daysToDelete = 1;
    const deletionDate = new Date(date.setDate(date.getDate() - daysToDelete));
    const associationDeleteDate = new Date(date.setMinutes(date.getMinutes() - 2));
    try{
    await ActiveSession.destroy({where:{ createdAt:  deletionDate.toISOString()}})
    await AssociationQuery.destroy({
      where:{
       createdAt: { 
         [Op.lt]: associationDeleteDate.toISOString()
                  }
           }
      })
    }
    catch{
      console.log("error cleaning token ")
    }

    /* User.deleteMany({email: {$ne: 'test@test.com'}}, function(err, item) {
      return;
    }); */
  },
};


