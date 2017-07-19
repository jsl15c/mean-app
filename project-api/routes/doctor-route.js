const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const DoctorModel = require('../models/doctor-model');

// get all patients
router.get('/doctors', (req, res, next) => {
  DoctorModel.find((err, patientList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(patientList);
  });
});

/* CREATE a new Phone. */
router.post('/doctors', (req, res, next) => {

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newDoctor = new DoctorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email:req.body.email,
    password:hashedPassword,
    phoneNumber:req.body.phoneNumber,
    picture:req.body.picture,
    patients:{type:Array}
  });

  newDoctor.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New doctor created!',
      id: newDoctor._id
    });
  });
});


module.exports = router;
