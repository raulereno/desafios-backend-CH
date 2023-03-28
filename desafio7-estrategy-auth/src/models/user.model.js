const mongoose = require("mongoose");
const { createHash } = require("../utils/passwordHash");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Este usuario ya se encuentra ocupado"],
    required: [true, "El usuario es requerido"],
  },
  email: {
    type: String,
    unique: [true, "Este mail ya se encuentra ocupado"],
    required: [true, "El email es requerido"],
  },
  password: { type: String },
  //Si tengo esto en el modelo, la autenticación por terceros falla
  // required: [true, "Ingresa un password"]
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
  if (user.password !== "") {
    user.password = createHash(this.password);
  }
  next();
});

module.exports = userSchema;
