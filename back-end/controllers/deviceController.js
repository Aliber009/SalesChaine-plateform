
const Device=require('../models/device');
const User = require('../models/user');

const deviceController={
getAll:async function(req, res) {
    const {user} = req.locals
    

    try{
      const devices=await user.getOwnerDevice();
      res.json({success: true, devices: devices});
    }
    catch{
          res.json({success: false,user:user});
        }
        //here  we need to filter the devices according the user Role and return the value, meanwhile we just return every device  
},
create:(req,res)=>{
    
    const {name,imei,organization,userId}=req.body;
    const newDevice = {name:name,imei:imei,organization:organization} 
    User.findOne({where:{id:userId}}).then(user=>{
    user.createOwnerDevice(newDevice).then((device)=>{ res.json({success:true,msg:"created",deviceId:device.id}) })
    .catch(err=>{console.log(err);res.json({success:false,msg:"failed"})})
})
.catch(err=>{res.json({success:false})})  
},
edit:(req,res)=>{
    const {deviceId,name,organization,imei}=req.body
    Device.findAll({ where: {id:deviceId}}).then((device)=>{
        if (device.length == 1)
         {
             const newValues={name:name,organization:organization,imei:imei}
             Device.update(newValues,{where:{id: device[0].id}})
             .then(()=>{res.json({success: true,deviceId:deviceId})})
             .catch(()=>{res.json({success: false, msg: 'There was an error. Please contract the administator'});})
              
         }
        else
            {
              res.json({success: false});
            }
      })
    },
    delete:(req,res)=>{
        const {deviceId}=req.body
        Device.findAll({ where: {id:deviceId}}).then((device)=>{
            if(device.length == 1)
            {
               Device.destroy({where:{id: device[0].id}})
               .then(()=>{ res.json({success: true,msg:"device deleted succesfully",deviceId:deviceId});})
               .catch(()=>{res.json({success: false, msg: 'There was an error. Please contract the administator'});})
            }
            else{
                res.json({success: false});
            }
        })
    }
}
module.exports=deviceController