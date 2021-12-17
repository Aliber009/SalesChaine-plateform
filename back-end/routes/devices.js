const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Device=require('../models/device')
const reqAuth = require('../config/safeRoutes').reqAuth;

router.post('/all', function(req, res) {
    Device.find({}, function(err, devices) {
      if (err) {
        res.json({success: false});
      }
      //here  we need to filter the devices according the user Role and return the value, meanwhile we just return every device
      res.json({success: true, devices: devices});
    });
  });


router.post('/create', (req,res)=>{
   
    const {name,imei,organization}=req.body;
    const newDevice = {name:name,imei:imei,organization:organization} 
    
    Device.create(newDevice).then((device)=>{ res.json({success:true,msg:"created",deviceId:device._id}) })
    .catch(err=>{console.log(err);res.json({success:false,msg:"failed"})})  
}) 

router.post('/edit',(req,res)=>{
    const {deviceId,name,organization,imei}=req.body
    Device.find({_id:deviceId}).then((device)=>{
        if (device.length == 1)
         {
             const newValues={$set:{name:name,organization:organization,imei:imei}}
             Device.updateOne({_id: device[0]._id},newValues,function(err, cb) {
                if (err) {
                  // eslint-disable-next-line max-len
                  res.json({success: false, msg: 'There was an error. Please contract the administator'});
                }
                res.json({success: true,deviceId:deviceId});
              });
            }
        else
            {
              res.json({success: false});
            }
      })
});
router.post('/delete',(req,res)=>{
    const {deviceId}=req.body
    Device.find({_id:deviceId}).then((device)=>{
        if(device.length == 1){
           Device.deleteOne({_id: device[0]._id},(err,cb)=>{
               if(err){
                res.json({success: false, msg: 'There was an error. Please contract the administator'});
               }
                res.json({success: true,msg:"device deleted succesfully",deviceId:deviceId});
           });
        }
        else{
            res.json({success: false});
        }
    })
});

module.exports = router;
