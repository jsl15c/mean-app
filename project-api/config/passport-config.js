// we are configuring Passport in a separate file
// to avoid making a mess in app.js
const passport = require('passport');
const bcrypt = require('bcrypt');

const PatientModel = require('../models/patient-model.js');

// serializeUser (controls what goes into the bowl)
//      - save only the user's database ID in the bowl
//      - happens only when you log in
passport.serializeUser((patientInfo, next) => {
  next(null, patientInfo._id);
  // null in 1st arg means NO ERROR
});

// deserializeUser (controls what you get when you check the bowl)
//      - use the ID in the bowl to retrieve the user's information
//      - happens every time you visit any page on site after logging in
passport.deserializeUser((idFromBowl, next) => {
  PatientModel.findById(idFromBowl, (err, patientInfo) =>{
    if (err) {
      next(err);
    }
    next(null, patientInfo);
  });
});

// STRATEGIES --------------------------------------------------
//    different ways of logging in

// SETUP passport-local
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {                              // 1st arg -> settings object
                                 // HAVE TO BE CORRECT SETTING KEY
    usernameField:'email',
    passwordField:'password'
  },
  (formEmail, formPassword, next) => {  // 2nd arg -> callback
                                           //   will be called when a user tries to login
   // #1: is there an account with the provided username?
   //     (is there a user with that username in the database)
   PatientModel.findOne(
     {email:formEmail},
     (err, patientInfo) => {
       if (err) {
         console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
         next(err);
         return;
       }
       if (patientInfo === null) {
         console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
         // in Passport, if you call the next() with "false", login failed
         next(null, false);
         return;
       }
       // #2: if there is a user with that username, is the password correct?
       if (bcrypt.compareSync(formPassword, patientInfo.password) === false) {
         console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
         // in Passport, if you call the next() with "false", login failed
         next(null, false);
         return;
       }

       // if we pass those if statements
       next(null, patientInfo);
     }
   );
 })
);
