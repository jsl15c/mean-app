const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  patients:{type:Array}
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorModel;
