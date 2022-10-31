const User = require("../models/users");
const async = require("async");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const rn = require('random-number');

var options = {
  min:  10000
, max:  99999
, integer: true
}

// Display index SignUp.

exports.index = (req, res) => {
  res.render('signup');
  };

//Saving signup data to database

exports.create = [
 // validation
  body('username')
    .trim()
    .isLength({min: 2})
    .escape()
    .withMessage('Username must be at least 2 characters long.'),
  body('password')
    .trim().isLength({min: 5})
    .escape()
    .withMessage('Password must be at least 5 characters long'),
  body('confirmPassword')
    .trim().isLength({min: 5})
    .escape().withMessage('Password must be at least 5 characters long')
  .custom( async(value, {req }) => {
    if(value !== req.body.password){
      console.log(req.body.password);
        throw new Error('Password confirmation does not match password')
    }
    return true;
}),
    async (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return res.render('signup', { errors: errors.errors, username: req.body.username})
    }
    try {
      const userExists = await User.findOne({username: req.body.username});
      if(userExists !== null){
        console.log('User exists')
          return res.render('register', { usernameExists: 'Username already exists'})
    }
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          member: false,
          password: hashedPassword,
          code: rn(options)
    })
    .save(err => {
      if (err) { 
        return next(err);
      }
      // New User created was successful
      console.log('user created');

      res.redirect("/signin");
    });
  }); 
    } catch(err){
      return next(err);
    }
    }
];
