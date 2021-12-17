const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },

})
const Organization = mongoose.model('Organization', OrgSchema);

module.exports = Organization;