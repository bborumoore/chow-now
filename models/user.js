const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
  },
  runHistory: [
    {
        type: Schema.Types.ObjectId,
        ref: "Run"
    }
  ], 
  orderHistory: [
    {
        
        timesOrdered: {
            type: Number,
            default: 0
        },
        objectID: {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    }
  ],
  orderItemHistory: [
    {
        type: Schema.Types.ObjectId,
        ref: "OrderItem"
    }
  ],
  orderFavorites: [
    {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }
  ],
  incompleteRuns: [
    {
        type: Schema.Types.ObjectId,
        ref: "Run"
    }
  ]
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  // return password === this.password;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
