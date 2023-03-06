const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

try {
  mongoose.connect(MONGODB_URL);
  console.log("MongoDB connected");
} catch (error) {
  console.log(error.message);
}

module.exports = mongoose;
