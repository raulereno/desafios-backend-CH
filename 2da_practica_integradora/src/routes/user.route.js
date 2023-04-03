const { Router } = require("express");
const {
  formLoginUser,
  formRegisterUser,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const isLogged = require("../middlewares/isLogged");
const passport = require("passport");

const userRoute = Router();

userRoute.get("/login", formLoginUser);
userRoute.post("/login", loginUser);
userRoute.get("/register", formRegisterUser);
userRoute.post("/register", createUser);
userRoute.get("/logout", logoutUser);

module.exports = userRoute;
