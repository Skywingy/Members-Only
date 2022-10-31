const Message = require('../models/messages');

exports.index = async(req, res, next) => {
    Message.find({}, "title message user timeStamp")
    .sort({ title: 1 })
    .populate("title")
    .exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.render("index", { title: "Message List", user: req.user, messages: messages });
    });

};
