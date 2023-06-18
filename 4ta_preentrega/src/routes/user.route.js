const { Router } = require("express");
const {
  formLoginUser,
  formRegisterUser,
  createUser,
  loginUser,
  logoutUser,
  changeRol,
  formRecoverPass,
  changePassword,
  restorePassword,
  sendNewPassword
} = require("../controllers/user.controller");
const isLogged = require("../middlewares/isLogged");


const userRoute = Router();


userRoute.post("/login", loginUser);
userRoute.post("/register", createUser);
userRoute.get("/logout", isLogged, logoutUser);
userRoute.get("/premium/:uid", changeRol)
userRoute.post("/recover/generatelink", changePassword)
userRoute.post("/changePassword", sendNewPassword)




module.exports = userRoute;
