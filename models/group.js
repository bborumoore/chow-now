const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: { 
    type: String, 
    required: true 
  },
  admin: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  groupCreated: {
    type: Date, 
    default: Date.now
  }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
