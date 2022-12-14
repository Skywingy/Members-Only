var mongoose = require('mongoose');
var { DateTime } = require('luxon');


var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type: String, required: true, minLength: 1, maxLength: 50},
    message: {type: String, required: true, minLength: 1, maxLength: 1000},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    timeStamp:{type: Date, default: Date.now, required: true},
});

MessageSchema
    .virtual('getDate')
    .get(function () {
    return DateTime.fromJSDate(this.timeStamp).toFormat('dd LLL yyyy');
    });

MessageSchema
    .virtual('getTime')
    .get(function () {
    return DateTime.fromJSDate(this.timeStamp).toFormat('HH: mm')
    })
// Virtual for author's URL
MessageSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
      return `/message/${this._id}`;
  });


module.exports = mongoose.model('Message', MessageSchema);