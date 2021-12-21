const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
      lat: {
        type: String,
        required: true,
      },
      lon: {
        type: String,
        required: true,
      },
      deviceId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Device'
      },
      date: {
        type: Date,
        default: Date.now,
      },

})
const Position = mongoose.model('Position', PositionSchema);

module.exports = Position;