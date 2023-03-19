const { Router } = require("express");
const {
  formLoginUser,
  formRegisterUser,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const passport = require("passport");

const userRoute = Router();

userRoute.get("/login", formLoginUser);
userRoute.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
userRoute.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    // Successful authentication, redirect home.

    req.session.user = req.user;
    res.redirect("/products");
  }
);
userRoute.post("/login", loginUser);
userRoute.get("/register", formRegisterUser);
userRoute.post("/register", createUser);
userRoute.get("/logout", logoutUser);

module.exports = userRoute;
