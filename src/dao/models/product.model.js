const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true, max: 30 },
  description: { type: String, required: true, max: 80 },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://www.mrpanet.org/global_graphics/default-store-350x350.jpg",
  },
});

module.exports = productSchema;
