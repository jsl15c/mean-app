const mongoose = require('mongoose');
const DataModel = require('./data-model.js');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  data:[DataModel]
});

const PatientModel = mongoose.model('Patient', patientSchema);

module.exports = PatientModel;
