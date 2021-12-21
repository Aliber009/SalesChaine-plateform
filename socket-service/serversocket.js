const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors=require('cors')
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose')
const Position=require('./models/position')

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// Connect to MongoDB
mongoose
    .connect(
        db, {useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true},
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

    
app.use(cors())

app.get('/', (req, res) => {
  res.send("Helolo");
});



io.on('connection', (socket) => {
    console.log('a user connected');
    SendAndSave()
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

//function that keep sending every 10 seconds 
const SendAndSave=()=>{
    setInterval(f, 10000);
}

function f(){
    const msg={deviceId:"61bb6833720c1182dcc8f666",lat:(33+Math.random()).toString(),lon:(-7+Math.random()).toString()}
    //Save in Db first
     Position.create(msg).then((pos)=>{ io.emit('tst',pos);console.log("created") })
    .catch(err=>{console.log(err)})  
    
}

server.listen(5000, () => {
  console.log('listening on *:5000');
});