const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});
client.on("connect", function() {
    console.log("Rediis connected");
  });
  

module.exports=client