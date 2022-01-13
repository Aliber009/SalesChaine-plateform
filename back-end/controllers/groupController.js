const { truncateSync } = require("fs");
const Device = require("../models/device");
const Group=require("../models/group")


const groupController={
getgroups:async (req,res)=>{
    const {user}=req.locals
        try{
        const groups=await user.getOwnerGroup({attributes:['id','name']});
        res.json({success:true,groups:groups})
        }
        catch{
            res.json({success:false})
        }
    },
getAll:async (req,res)=>{
    const {user}=req.locals
    try{
    const groups= await user.getOwnerGroup()
    var grdev=[]
    for(var i=0;i<groups.length;i++)
    {
        const devs=await groups[i].getDevices();
        grdev.push({id:groups[i].id,name:groups[i].name,Devices:devs})
    }
    //const groups=await user.OwnerGroup.findAll({include:{model:Device, attributes:["id","name","imei","organization"]}})
    res.json({success:true,groups:grdev})
    }
    catch{
        res.json({success:false})
    }
},
create:async (req,res)=>{
    const {user}=req.locals
    const {name}=req.body;
    const query={name:name}
    try{
    const group=await user.createOwnerGroup(query)
    res.json({success:true,msg:'groups has been created',groupeId:groupe.id})
    }
    catch{
        res.json({succes:false})
    }
   
},    
addDevices:async (req,res)=>{
    const {user}=req.locals
    const {deviceIds,groupeId}=req.body;
    Group.findOne({include:{model:Device}, where:{id:groupeId}}).then(async (groupe)=>{
    if(groupe){
      groupe.addDevice(deviceIds)
     .then(async(gr)=>{
        try{
            const groups= await user.getOwnerGroup()
            var grdev=[]
            for(var i=0;i<groups.length;i++)
            {
            const devs=await groups[i].getDevices();
            grdev.push({id:groups[i].id,name:groups[i].name,Devices:devs})
            }
            // const groups=await user.getOwnerGroups({include:{model:Device, attributes:["id","name","imei","organization"]}})
            res.json({success:true,msg:"Devices have been added",groupeDevice:grdev }) 
            }
        catch{
            res.json({success:false,msg:"Error", })
             }
        });
    }
    else{
        res.json({success:false,msg:"Group is not found" })
        }
   })
   .catch(err=>{res.json({success:false,msg:"Error Occuried" })})
 },
 delete:(req,res)=>{
    const {id}=req.body;
    
    Group.destroy({where:{id:id}})
    .then(()=>{res.json({success:true,msg:'groups has been deleted'})})
    .catch(()=>{res.json({succes:false})})
},   
}
module.exports=groupController