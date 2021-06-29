const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const axios = require("axios");

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

const determineTotal = () => {
    // get all of orderItems IDs
    for (let index = 0; index < this.orderItems.length; index++) {
        const element = array[index];
        axios.get(`/orderItem/${this.orderItems[index]}`)
        .then
    }
    // get the order item prices from orderItems
    //total the prices
    //return total value
}

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
