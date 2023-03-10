const mongoose = require("mongoose");
const { createHash } = require("../utils/passwordHash");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Este usuario ya se encuentra ocupado"],
    required: [true, "El usuario es requirido"],
  },
  email: {
    type: String,
    unique: [true, "Este mail ya se encuentra ocupado"],
    required: [true, "El email es requirido"],
  },
  password: { type: String, required: [true, "Ingresa un password"] },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await createHash(this.password);
  next();
});

module.exports = userSchema;
