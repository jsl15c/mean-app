const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema ({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  phoneNumber:{type:String},
  picture:{},
  patients:{type:Array}
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorModel;
