const mongoose = require('mongoose');
const DataModel = require('./data-model.js');

const Schema = mongoose.Schema;

const patientSchema = new Schema ({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {type:String},
  picture:{},
  phoneNumber:{type:String},
  data:[DataModel.schema]
});

const PatientModel = mongoose.model('Patient', patientSchema);

module.exports = PatientModel;
