
const Device=require('../models/device')

const deviceController={
getAll:async function(req, res) {
    try{
      const devices=await Device.findAll()
      res.json({success: true, devices: devices});
    }
    catch{
          res.json({success: false});
        }
        //here  we need to filter the devices according the user Role and return the value, meanwhile we just return every device  
},
create:(req,res)=>{
   
    const {name,imei,organization}=req.body;
    const newDevice = {name:name,imei:imei,organization:organization} 
    
    Device.create(newDevice).then((device)=>{ res.json({success:true,msg:"created",deviceId:device.id}) })
    .catch(err=>{console.log(err);res.json({success:false,msg:"failed"})})  
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