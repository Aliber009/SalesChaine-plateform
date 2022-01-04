

const ActiveSession = require('../models/activeSession');
const User = require('../models/user');


const reqAuth = async (req, res, next) => {
  const token = String(req.headers.authorization);
  try{
  const session=await ActiveSession.findAll({where:{token: token}})
    if (session.length == 1) {
      const user = await User.findOne({where:{id:session[0].userId}})
      req.locals={user}; 
      return next();
      
    } else {
      return res.json({success: false, msg: 'User is not logged on'}); 
    }
  }
  catch(err){
    
    return res.json({success: false, msg:err});
  }
};

module.exports = {
  reqAuth: reqAuth,
};
