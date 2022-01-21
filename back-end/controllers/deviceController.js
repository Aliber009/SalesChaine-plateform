
const {Device, Position} = require('../models/device');
const User = require('../models/user');

const deviceController={
getAll:async function(req, res) {
    const {user} = req.locals
    

    try{
      const devices=await user.getOwnerDevice();
      //get device last positions:
      var lastpos=[]
      for(var i=0;i<devices.length;i++){
      const LastPos=await Position.findOne({
          attributes:['deviceId','lat','lon','Attributes','gpsTime'],
          where:{deviceId:devices[i].id},
          order: [['createdAt', 'DESC']],
        })
      lastpos.push(LastPos)
      }
      res.json({success: true, devices: devices,lastpos:lastpos});
    }
    catch{
          res.json({success: false,user:user});
        }
        //here  we need to filter the devices according the user Role and return the value, meanwhile we just return every device  
},


create:async (req,res)=>{
    const {user} = req.locals
    const {name,imei,organization}=req.body;
    const newDevice = {name:name,imei:imei,organization:organization} 
    
    try
    {
    const newdevice=await user.createOwnerDevice(newDevice);
    res.json({success:true,msg:"created",deviceId:newdevice.id})
     }
    catch(err)
    {
        console.log(err);res.json({success:false,msg:"failed"})
    }
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