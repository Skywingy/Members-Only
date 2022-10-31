const { body, validationResult } = require("express-validator");
const User = require("../models/users");

// Display index MemberForm.
exports.index = (req, res) => {
    res.render('member', {user:req.user});
    };
    

//Saving Member data to database

exports.enter =  [
  body("code").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("member", { warning: "Passcode is wrong", user: res.locals.currentUser, errors: errors.errors });
    } else if (req.body.code != res.locals.currentUser.code) {
      return res.render("member", { warning: "Passcode is wrong", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }

    const userToUpdate = await User.findOne({username: res.locals.currentUser.username});;
    userToUpdate.member = true;

    await userToUpdate.save( err => {
      if (err) {
        return next(err);
      }
      console.log("user updated pls");
      res.redirect('/');
    });
  }
];