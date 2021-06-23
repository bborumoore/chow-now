const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runSchema = new Schema({
    runner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    runCreated: {
        type: Date, 
        default: Date.now
    },
    status: {
        type: String,
        enum: ['started','ordered', 'pickedUp', 'delivered', 'completed'],
        default : 'started' 
    },
    runName: {
        type: String,
        required : true
    }
});

const Run = mongoose.model("Run", runSchema);

module.exports = Run;