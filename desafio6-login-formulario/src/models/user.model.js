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
  //No le veo mucha seguridad a este metodo,yo lo guardaria en la bd con la password hasheada

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.rol = "admin";
  }
  user.password = createHash(this.password);
  next();
});

module.exports = userSchema;
