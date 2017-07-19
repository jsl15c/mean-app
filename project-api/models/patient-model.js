const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String, default: ''
  },
  specs: {
    type: Array,
    default: []
  }
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
