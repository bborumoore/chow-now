const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: { 
    type: String, 
    required: true 
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
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
  },
  groupImgURL: {
    type: String
  }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
