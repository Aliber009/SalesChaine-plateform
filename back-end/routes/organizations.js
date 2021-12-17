const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Organization=require('../models/organization')
const reqAuth = require('../config/safeRoutes').reqAuth;

router.post('/all', async function(req, res) {
  try{
  const org=await Organization.find();
  res.json({success: true, organizations: org})
  }
  catch(e){
    res.json({success: false})
  }

   /* Organization.find({}, function(err, organizations) {
      if (err) {
        res.json({success: false});
      }
      //here  we need to filter the Organizations according the user Role and return the value, meanwhile we just return every Organization
      res.json({success: true, organizations: organizations});
    }); */
  });


router.post('/create', (req,res)=>{
   
    const {name,description}=req.body;
    const newOrganization = {name:name,description:description} 
    
    Organization.create(newOrganization).then((Organization)=>{ res.json({success:true,msg:"created",organizationId:Organization._id}) })
    .catch(err=>res.json({success:false,msg:"failed"}))  
}) 

router.post('/edit',(req,res)=>{
    const {organizationId,name,description}=req.body
    Organization.find({_id:organizationId}).then((organization)=>{
        if (organization.length == 1)
         {
             const newValues={$set:{name:name,description:description}}
             Organization.updateOne({_id: organization[0]._id},newValues,function(err, cb) {
                if (err) {
                  // eslint-disable-next-line max-len
                  res.json({success: false, msg: 'There was an error. Please contract the administator'});
                }
                res.json({success: true,organizationId:organizationId});
              });
            }
        else
            {
              res.json({success: false});
            }
      })
});
router.post('/delete',(req,res)=>{
    const {organizationId}=req.body
    Organization.find({_id:organizationId}).then((organization)=>{
        if(organization.length == 1){
           Organization.deleteOne({_id: organization[0]._id},(err,cb)=>{
               if(err){
                res.json({success: false, msg: 'There was an error. Please contract the administator'});
               }
               res.json({success: true,msg:"Organization deleted succesfully",organizationId:organizationId});
           });
        }
        else{
            res.json({success: false});
        }
    })
});

module.exports = router;
