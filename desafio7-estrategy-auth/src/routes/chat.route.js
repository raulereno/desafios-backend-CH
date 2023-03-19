const { Router } = require("express");
const {
  getAllMessages,
  addMessages,
} = require("../controllers/chat.controller");
const isLogged = require("../middlewares/isLogged");

const route = Router();

route.get("/", isLogged, getAllMessages);
route.post("/", isLogged, addMessages);

module.exports = route;
