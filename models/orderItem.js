const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const orderItemSchema = new Schema({
  orderItemName: { 
    type: String,
    required: true 
  },
  orderItemPrice: {
      type: Currency
  },
  orderItemNotes: {
      type: String
  }
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
