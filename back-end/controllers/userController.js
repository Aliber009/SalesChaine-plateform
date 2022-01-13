
const User=require('../models/user')
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const ActiveSession = require('../models/activeSession');
const {smtpConf} = require('../config/smpt');
const Device = require('../models/device');
//redis
const { v4 } = require('uuid');
const AssociationQuery =require('../models/associationQuery')





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
            const query = {name: name, email: email,accountConfirmation:accountConfirmation,role: role,company: company,
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
            const query = {name: name, email: email, password: hash, role:"USER"};
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
                 res.json({success: true, msg: 'Comfirmation mail has been sent  '});
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
        console.log("user",user)
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
logout:async(req, res) => {
    const {user}=req.locals
    try{
    await ActiveSession.destroy({where:{userId: user.id}})
    res.json({success:true})
    }
    catch{
      res.json({success:false})
    }
   
},
associate: async (req,res)=>{
 
  const uuID = v4();
  const {user}=req.locals
  const userId=user.id
  //console.log("uuuid",uuID)
  const { email, deviceId} = req.body
  //set in Redis as key value: 
  //const client = await redis.createClient();
  
 
  const transporter = nodemailer.createTransport(smtpConf);
  User.findOne({where:{email: email}})
    .then(async (user)=>{
      if(user){
      try{
       await transporter.sendMail({
        from: '"Nextronic" <' + smtpConf.auth.user + '>',
        to: email, // list of receivers
        subject: 'Nextronic, Product Association', // Subject line
        // eslint-disable-next-line max-len
        html: '<h1>Hey</h1><br><p>You are invited to associate to product from :  </p><p><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
      }); 
         await user.addDevice(deviceId, { through: { giverId: userId }})
         //await user.addDevice(deviceId); 
        res.json({success:true,msg:"Association notification has been sent through mail"})
      }
      catch{
        await res.json({success:false,msg:"Error Occuried"})
      }
    }
      else{
        await AssociationQuery.create({key:uuID,info:JSON.stringify({giverId:userId,email:email,deviceIds:deviceId})})
        await transporter.sendMail({
          from: '"Nextronic" <' + smtpConf.auth.user + '>',
          to: email, // list of receivers
          subject: 'Nextronic, Product Association', // Subject line
          html: '<h1>Hey</h1><br><p>You are invited to associate to product from : ! You need to create account first via this link : <a href="' + 'http://localhost:3000/auth/registerassociate/'+uuID+'"> Register As Associate </a><br></br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
      });
      await res.json({success:true,msg:"Association email has been sent! Invited user must register"})
      }
    })
    .catch(err=>{res.json({success:false,msg:err})})
 },
 findAssociations:(req,res)=>{
   const {user} = req.locals
   User.findOne({where:{id:user.id}})
   .then(async user=>{
     //search assoctiated
     const devUser=await user.getAssociated();
     var lischildren=[];
     var checkduplicatesChil=[]
     
     for(var i=0;i<devUser.length;i++)
     {
      const dev=await devUser[i].getDevices();
      
      if(checkduplicatesChil.includes(devUser[i].id)==false){
      checkduplicatesChil.push(devUser[i].id);
      lischildren.push({id:devUser[i].id,name:devUser[i].name,email:devUser[i].email,Devices:dev})
      }
     }
     //search parents
     const devParent= await user.getParents();
     var lisparents=[];
     var checkduplicatesPar=[]
     for(var i=0;i<devParent.length;i++)
     {
      const dev=await user.getDevices({through:{model:devParent[i]}});
      if(checkduplicatesPar.includes(devParent[i].id)==false){
      checkduplicatesPar.push(devParent[i].id);
      lisparents.push({id:devParent[i].id,name:devParent[i].name,email:devParent[i].email,Devices:dev})
     }
    }
     // response of both parents and children devices 
      res.json({success:true,associationsChildren:lischildren,associationsParent:lisparents})

   })
   .catch(err=>{res.json({success:false,msg:err})})

 },
 removeDeviceAssociations:(req,res)=>{
  const {associatedUserId,deviceIds} = req.body;
  User.findOne({where:{id:associatedUserId}})
  .then(async user=>{
    //remove associated devices with ids 
    try{
     await user.removeDevice(deviceIds)
     res.json({success:true,msg:"Devices were dessociate from this user"})
    }
    catch{
      res.json({success:false,msg:"Error Occuried"})
    }

  })
  .catch(err=>{res.json({success:false,msg:err})})

},
 registerAsAssociciate:async (req,res)=>{
  const {name, password, key} = req.body;
  try{
  const associationInfo=await AssociationQuery.findOne({where:{key:key}})
  const {email,giverId,deviceIds}=JSON.parse(associationInfo.info)

  User.findOne({where:{email: email}}).then((user) => {
    if (user) {
      res.json({success: false, msg: 'Email already exists'});
    } else if (password.length < 6) {
      res.json({success: false, msg: 'Password must be at least 6 characters long'});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) throw err;
          const query = {name: name, email: email, password: hash, role:"USER",accountConfirmation:true};
           User.create(query)
           .then(async(userr) =>{
               
               await userr.addDevice(deviceIds,{through:{giverId:parseInt(giverId)}})
               await AssociationQuery.destroy({where:{key:key}})
               res.json({success: true, msg: 'Associate user registered succesfully'});
            })
            .catch(err=>{res.json({sucess:false,msg:"Error occuried"})})
         
        });
      });
    }
  });
}
catch{
  res.json({msg:"key not found or expired ",success:false })
}

 },

 setdevices:async(req,res)=>{
    const devs=await Device.findAll({})
    User.findOne({where:{id:2}}).then(user=>{user.addOwnerDevice(devs)})
    .catch(err=>{res.send("err")})
 }

 
}
module.exports=userController