const User = require("../models/users");
const async = require("async");
const { body, validationResult } = require("express-validator");
const Message = require("../models/messages");

// Display index Message Form.

exports.index = (req, res) => {
    res.render('message_forms', {user:req.user});
    };

//Saving message data to database
exports.enter = [
  body('title').trim().isLength({min:1}).withMessage('Add a title to your post'),
  body('message').trim().isLength({min:1}).withMessage('Add a message!'),

  async (req ,res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      console.log('error', errors)
      return next(err);
}
  try{
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: res.locals.currentUser
    })

    message.save(err =>{
        if (err){
        return next(err);
      }
      console.log('message saved');
      res.redirect('/');
    })

  } catch(err){
    return next(err);
  }

  }
];

exports.delete_message_get = (req, res, next) => {
  async.parallel(
    {
      message: function (callback) {
        Message.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.message == null) {
        // No results.
        var err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      res.render("delete", {
        title: "Delete Message - Members Only",
        message: results.message,
        user: res.locals.currentUser,
      });
    }
  );
};

exports.delete_message_post = (req, res, next) => {
  // Remove the message using the id from the database
  Message.findByIdAndRemove(req.body.messageId, function deleteMessage(err) {
    console.log("end baina",req.body.messageId)
    if (err) return next(err);
    res.redirect("/");
  });
};