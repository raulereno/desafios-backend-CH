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


const userRoute = Router();

userRoute.get("/login", formLoginUser);
userRoute.post("/login", loginUser);
userRoute.get("/register", formRegisterUser);
userRoute.post("/register", createUser);
userRoute.get("/logout", logoutUser);
userRoute.get("/premium/:uid", changeRol)
userRoute.get("/recover", formRecoverPass)
userRoute.post("/recover/generatelink", changePassword)
userRoute.get("/restorepass/:token", restorePassword);
userRoute.post("/changePassword", sendNewPassword)




module.exports = userRoute;
