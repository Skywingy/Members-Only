const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const magicW = "Sesame open";

// Display index MemberForm.
exports.index = (req, res) => {
    res.render('admin', {user:req.user});
    };
    

//Saving Admin data to database

exports.enter =  [
  body("magicword").trim().isLength({ min: 1 }).escape().withMessage("MagicWord must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("admin", { warning: "MagicWord is wrong", user: res.locals.currentUser, errors: errors.errors });
    } else if (req.body.magicword != magicW) {
      return res.render("admin", { warning: "MagicWord is wrongg", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }

    const userToUpdate = await User.findOne({username: res.locals.currentUser.username});;
    userToUpdate.admin = true;

    await userToUpdate.save( err => {
      if (err) {
        return next(err);
      }
      console.log("user updated pls");
      res.redirect('/');
    });
  }
];