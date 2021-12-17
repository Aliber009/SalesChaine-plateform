const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      imei: {
        type: String,
        required: true,
      },
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
      },
      date: {
        type: Date,
        default: Date.now,
      },

})
const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;