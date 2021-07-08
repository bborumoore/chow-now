const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const orderSchema = new Schema({
    user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
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
    status: {
        type: String,
        enum: ['waiting','placed', 'payed'],
        default: 'waiting'
    },
    timesOrdered: {
        type: Number,
        default: 0
    },
    orderName: {
        type: String
    },
    orderTotal: {
        type: Currency
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
