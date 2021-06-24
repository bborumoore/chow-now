const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "orderItems"
        }
    ],
    orderCreated: {
        type: Date,
        default: Date.now
    },
    timesOrdered: {
        type: Number,
        default: 0
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
