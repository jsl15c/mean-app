const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const PatientModel = require('../models/patient-model');
const DataModel = require('../models/data-model');

// get all patients
router.get('/patients', (req, res, next) => {
  PatientModel.find((err, patientList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(patientList);
  });
});

/* CREATE a new Phone. */
router.post('/patients', (req, res, next) => {

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newPatient = new PatientModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email:req.body.email,
    password:hashedPassword,
    picture:req.body.picture,
    phoneNumber:req.body.phoneNumber,
    data:[DataModel]
  });

  newPatient.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New patient created!',
      id: newPatient._id
    });
  });
});

// delete patient account
router.post('/patients/:myId', (req, res, next) => {
  // console.log(req.params.myId);
  PatientModel.findByIdAndRemove(req.params.myId,
    (err, patientEntry) => {
        if (err) {
          next(err);
          console.log(patientEntry);
          return;
        }
  });
});

module.exports = router;
