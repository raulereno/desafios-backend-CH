const mongoose = require("./../dao/index");

const cartSchema = mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

module.exports = cartSchema;
