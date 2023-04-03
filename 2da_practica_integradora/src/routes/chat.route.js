const { Router } = require("express");
const {
  getAllMessages,
  addMessages,
} = require("../controllers/chat.controller");
const isLogged = require("../middlewares/isLogged");
const passport = require("passport");

const route = Router();

route.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllMessages
);
route.post("/", passport.authenticate("jwt", { session: false }), addMessages);

module.exports = route;
