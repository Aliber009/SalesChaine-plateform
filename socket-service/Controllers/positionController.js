
const {Position} =require('../models/position');
const {Op}=require('sequelize')

const PositionController={
 emitPositions=(res,res)=>{

 },   
 lastPosition:(req,res)=>{
    const deviceId=req.query.deviceId;
    Position.findOne({
        attributes: ['lat' , 'lon'] ,
        where:{
        deviceId:deviceId},
        order: [['createdAt', 'DESC']],
    })
    .then(pos=>{res.json({success:true,currentposition:[parseFloat(pos.lat),parseFloat(pos.lon)]})})
    .catch(err=>{res.json({success:false,msg:err})})

 },   
 replay:async (req,res)=>{
     const deviceId=req.query.deviceId;
     //Date to cast the string in the query params 
     const from=req.query.from;
     const to=req.query.to; 
     try{
     const pos =await Position.findAll({
        attributes: ['lat' , 'lon'] ,
        where:{
        [Op.and]:[ 
        {deviceId:deviceId},
        {gpsTime:
            { [Op.between]:[from,to]} }
        ]
      },
      order: [['createdAt', 'ASC']],
     })
     res.json({success:true,positions:pos})
    }
    catch{
        res.json({success:false})
         }
    }
}
module.exports=PositionController
