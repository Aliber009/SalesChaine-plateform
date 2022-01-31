const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors=require('cors')
const {Position}=require('./models/position')
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// Connect to pstgres
const sequelize=require('./config/sequelize');
const {Devices} = require('./models/position');
const eventEmitter=require('./config/rabbit');
    
app.use(cors())
app.get('/', (req, res) => {
  res.send("Helolo");
});



 
//Data should be stored in Db even the user is not connected but only updated if they're connected


     
     //consuming 
     eventEmitter.on("mqChannel", (channel)=>{
      channel.prefetch(1)
      channel.consume("http-queue", async (msg) => {
         const jsonmsg=JSON.parse(msg.content.toString())
         const device=await Devices.findOne({where:{imei:jsonmsg.serial}})
        if(device){
        const gpsTime = new Date(jsonmsg.time*1000).toISOString();
        const queries = {
          lat:jsonmsg.lat,
          lon:jsonmsg.lng,
          deviceId:device.id,
          gpsTime:gpsTime,
          Attributes:JSON.stringify({odometre:jsonmsg.odometer , battery:jsonmsg.bat_level ,temperature:jsonmsg.coolant_temp  ,speed:jsonmsg.vehicle_speed,imei:jsonmsg.serial })
        } 
        const pos=await Position.create(queries) ;
        //send pos and additional data only if the user has it
            io.emit('tst',pos);
        
        } 
        setTimeout(function() {
          
          console.log(" [x] Done");
          channel.ack(msg);
        }, 50);
    }, {
    noAck: false
  });
 }); 
 
app.use('/socket/positions',require('./routes/positions'))
server.listen(5000, () => {
  console.log('listening on *:5000');
});