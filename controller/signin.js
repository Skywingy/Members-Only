const User = require("../models/users");
const async = require("async");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Display index SignUp.

exports.index = (req, res) => {
  res.render('signin');
  };

//Saving signup data to database

exports.enter = passport.authenticate("local", {
  successRedirect: "/member",
  failureRedirect: "/signin"
})
