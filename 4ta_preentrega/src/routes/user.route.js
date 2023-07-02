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
  sendNewPassword,
  uploadDocs
} = require("../controllers/user.controller");
const isLogged = require("../middlewares/isLogged");
const uploader = require("./../utils/multer")


const userRoute = Router();

const files = [
  {
    name: "identification", maxCount: 1
  },
  {
    name: "address", maxCount: 1
  },
  {
    name: "statusCount", maxCount: 1
  }
]


userRoute.post("/login", loginUser);
userRoute.post("/register", createUser);
userRoute.post("/recover/generatelink", changePassword)
userRoute.post("/changePassword", sendNewPassword)
userRoute.get("/logout", isLogged, logoutUser);
userRoute.get("/premium/:uid", isLogged, changeRol)
userRoute.post("/:uid/documents", isLogged, uploader.fields(files), uploadDocs)




module.exports = userRoute;
