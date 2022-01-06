
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./keys');

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({where:{id:jwtPayload._doc._id}})
    .then((user)=>{
      if(user){
        
        return done(user,true)
       }
      else{  return done(null, false);} 
      }
    )
   .catch(err=>{return done(err, false)}) 
      
  }));
};
