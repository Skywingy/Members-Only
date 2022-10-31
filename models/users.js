//Test
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxLength: 25 },
    lastname: { type: String, required: true, maxLength: 25 },
    username: { type: String, required: true },
    email: { type: String, required: true },
    member: { type: Boolean, default: false},
    admin: {type: Boolean, default:false },
    password: { type: String, required: true },
    code: {type: String, required: false}
    /* hashedPassword: {type: String, required: false} */
  });


// Export model
module.exports = mongoose.model("User", UserSchema);
