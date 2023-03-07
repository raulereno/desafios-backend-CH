const mongoose = require("./../dao/index");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true, max: 30 },
  description: { type: String, required: true, max: 100 },
  category: { type: String, required: true, default: "general" },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://www.mrpanet.org/global_graphics/default-store-350x350.jpg",
  },
});
productSchema.plugin(mongoosePaginate);

module.exports = productSchema;
