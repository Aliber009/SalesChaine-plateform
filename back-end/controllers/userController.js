
const User=require('../models/user')
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const ActiveSession = require('../models/activeSession');
const {smtpConf} = require('../config/smpt');

const userController={

getAll: async function(req, res) {
    try{
    const users=await User.findAll() 
      const us = users.map((item)=>{
        var x = item;
        x.password = undefined;
        //x.__v = undefined;
        return x;
      }); 
      res.json({success: true, users: us});
    }
    catch{
      res.json({success: false});
    }
},
create:(req, res) => {
    const {name, email, password,accountConfirmation,role,company} = req.body;
  
    User.findOne({email: email}).then((user) => {
      if (user) {
        res.json({success: false, msg: 'Email already exists'});
      } else if (password.length < 6) {
        // eslint-disable-next-line max-len
        res.json({success: false, msg: 'Password must be at least 6 characters long'});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, null, (err, hash) => {
            if (err) throw err;
            const query = {name: name, email: email,accountConfirmation:accountConfirmation,role:role,company:company,
              password: hash};
             User.create(query)
             .then(user=>{res.json({success: true, userID: user.id, msg: 'The user was succesfully registered'})})
             .catch(()=>{res.json({success:false})}) 
          });
        });
      }
    });
},
edit:function(req, res) {
  const {userID, name, email,company,role,accountConfirmation} = req.body;

  User.findAll({ where:{id: userID}}).then((user) => {
    if (user.length == 1)
     {
      const query = {id: user[0].id};
      const newvalues =  {name: name, email: email,company:company,role:role,accountConfirmation:accountConfirmation};
      User.update(newvalues,{where:query})
      .then(user=>{ res.json({success: true,userID:userID}); })
      .catch(err=>{ res.json({success: false, msg: 'There was an error. Please contract the administator'}); })
    }
     else {
      res.json({success: false});
    }
    });
 },
    delete:(req,res)=>{
        const {userID}=req.body
        User.findAll({where:{id:userID}}).then((user)=>{
            if(user.length == 1){
               User.destroy({where:{id: user[0].id}})
               .then(()=>{res.json({success: true,msg:"device deleted succesfully",userID:userID});})
               .catch(()=>{res.json({success: false, msg: 'There was an error. Please contract the administator'});})
            }
            else{
                res.json({success: false});
            }
        })
    },
checkrestepass:(req, res) => {
    const userID = req.params.id;
    User.findAll({where:{id: userID}}).then((user) => {
      if (user.length == 1 && user[0].resetPass == true) {
        res.json({success: true}); // reset password was made for this user
      } else {
        res.json({success: false});
      }
    });
},
resetpass:(req, res) => {
    const errors = [];
    const userID = req.params.id;
  
    let {password} = req.body;
  
    if (password.length < 6) {
      errors.push({msg: 'Password must be at least 6 characters'});
    }
    if (errors.length > 0) {
      res.json({success: false, msg: errors});
    } else {
      const query = {id: userID};
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) throw err;
          password = hash;
          const newvalues =  {resetPass: false, password: password};
          User.update(newvaluesn,{where:query})
          .then(()=>{res.json({success: true});})
          .catch(err=>{res.json({success: false, msg: err});})
            
        });
      });
    }
},
forgotpass:(req, res) => {
    const {email} = req.body;
    const errors = [];
  
    if (!email) {
      errors.push({msg: 'Please enter all fields'});
    }
    User.findAll({where:{email: email}}).then((user) => {
      if (user.length != 1) {
        errors.push({msg: 'Email Address does not exist'});
      }
      if (errors.length > 0) {
        res.json({success: false, errors: errors});
      } else {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(smtpConf);
  
        const query = {id: user[0].id};
        const newvalues = {resetPass: true};
        User.update(newvalues,{where:{query}})
  
        // don't send emails if it is in demo mode
        if (process.env.DEMO != 'yes') {
          // send mail with defined transport object
          transporter.sendMail({
            from: '"Creative Tim" <' + smtpConf.auth.user + '>', // sender address
            to: email, // list of receivers
            subject: 'Creative Tim Reset Password', // Subject line
            // eslint-disable-next-line max-len
            html: '<h1>Hey,</h1><br><p>If you want to reset your password, please click on the following link:</p><p><a href="' + 'http://localhost:3000/auth/confirm-password/' + user._id + '">"' + 'http://localhost:3000/auth/confirm-email/' + user._id + + '"</a><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
          });
          res.json({success: true});
        }
        res.json({success: true, userID: user[0].id});
      }
    });
},
register:(req, res) => {
    const {name, email, password} = req.body;
  
    User.findOne({where:{email: email}}).then((user) => {
      if (user) {
        res.json({success: false, msg: 'Email already exists'});
      } else if (password.length < 6) {
        // eslint-disable-next-line max-len
        res.json({success: false, msg: 'Password must be at least 6 characters long'});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, null, (err, hash) => {
            if (err) throw err;
            const query = {name: name, email: email,
              password: hash};
             User.create(query)
             .then( async (user)=>{
              const transporter = nodemailer.createTransport(smtpConf);
              // don't send emails if it is in demo mode
              if (process.env.DEMO != 'yes') {
              // send mail with defined transport object
                await transporter.sendMail({
                  from: '"Nextronic" <' + smtpConf.auth.user + '>',
                  to: email, // list of receivers
                  subject: 'Nextronic Confirmation Account', // Subject line
                  // eslint-disable-next-line max-len
                  html: '<h1>Hey</h1><br><p>Confirm your new account </p><p><a href="' + 'http://localhost:3000/auth/confirm-email/' + user.id + '">"' + 'http://localhost:3000/auth/confirm-email/' + user.id + '"</a><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
                });
                // eslint-disable-next-line max-len
                await res.json({success: true, msg: 'Comfirmation mail has been sent  '});
              }
              // eslint-disable-next-line max-len
              res.json({success: true, userID: user.id, msg: 'The user was succesfully registered'});
            })
             .catch(err=>{res.json({msg:err})})
              //end of user
          });
        });
      }
    });
},
confirm:(req, res) => {
    const userID = req.params.id;
  
    const query = {id: userID};
    const newvalues = {accountConfirmation: true};
    User.update( newvalues,{where:query} )
    .then((user)=>{res.json({success: true,user:user});})
    .catch(()=>{res.json({success: false});})
},
login:(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({where:{email: email}})
    .then((user)=>{
      
      if (user==null) {
        return  res.json({success: false, msg: 'Wrong credentials'});
      }
      if (!user.accountConfirmation) {
        return  res.json({success: false, msg: 'Account is not confirmed'});
      }
      bcrypt.compare(password, user.password, async function(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign(user, config.secret, {
            expiresIn: 86400, // 1 week
          });
          // Don't include the password in the returned user object
          const query = {userId: user.id, token: 'JWT ' + token};
          ActiveSession.create(query)
          .then(()=>{
           
            user.password = null;
            //user.__v = null;
              res.json({
              success: true,
              token: 'JWT ' + token,
              user,
            });
          })
          .catch(err=>{res.json({success: false, msg: 'error while login '+err});})
          
        }
        else{
          res.json({success:false,msg:"Wrong credentials"})
        }
      })
    })
    .catch(err=>{res.json({success:false,msg:"cant log in"})})
},
logout:function(req, res) {
    const token = req.body.token;
    ActiveSession.destroy({where:{token: token}})
   .then(()=>{  res.json({success: true}) })
   .catch(()=>{ res.json({success: false}); })
}


}
module.exports=userController