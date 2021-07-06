const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runSchema = new Schema({
    runner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orders: [
        {
            orderPaid: {
                type: Boolean,
                default: false
            },
            objectID: {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        }
    ],
    runCreated: {
        type: Date, 
        default: Date.now
    },
    status: {
        type: String,
        enum: ['started','ordered', 'pickedUp', 'delivered', 'completed'],
        default: 'started' 
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantAddress: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Run = mongoose.model("Run", runSchema);

module.exports = Run;
