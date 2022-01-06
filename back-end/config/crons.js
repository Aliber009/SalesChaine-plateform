
const ActiveSession = require('../models/activeSession');
const User = require('../models/user');

module.exports = {
  tokensCleanUp: async function() {
    const date = new Date();
    const daysToDelete = 1;
    const deletionDate = new Date(date.setDate(date.getDate() - daysToDelete));
    try{
    await ActiveSession.destroy({where:{ date:  deletionDate}})
    }
    catch{
      console.log("error cleaning token ")
    }

    /* User.deleteMany({email: {$ne: 'test@test.com'}}, function(err, item) {
      return;
    }); */
  },
};


