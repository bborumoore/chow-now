const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },
  lastName: {
      type: String,
      trim: true
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  avatarURL: {
      type: String      
  },
  broadcastNote: {
      type: String,
      validate: [({ length }) => length <= 20, "Note can't be more than 20 characters."]
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
