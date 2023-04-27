const mongoose = require("mongoose");
const { createHash } = require("../utils/passwordHash");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Este usuario ya se encuentra ocupado"],
    required: [true, "El usuario es requerido"],
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: [true, "Este mail ya se encuentra ocupado"],
    required: [true, "El email es requerido"],
  },
  password: { type: String, required: [true, "Ingresa un password"] },
  rol: {
    type: String,
    default: "usuario",
  },
  cartId: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (
    user.email === process.env.ADMIN_EMAIL &&
    user.password === process.env.ADMIN_PASS
  ) {
    user.rol = "admin";
  }
  user.password = createHash(this.password);
  next();
});

module.exports = userSchema;
