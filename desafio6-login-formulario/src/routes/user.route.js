const { Router } = require("express");
const {
  formLoginUser,
  formRegisterUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");

const userRoute = Router();

userRoute.get("/login", formLoginUser);
userRoute.post("/login", loginUser);
userRoute.get("/register", formRegisterUser);
userRoute.post("/register", createUser);

module.exports = userRoute;
