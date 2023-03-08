const { Router } = require("express");
const {
  getAllMessages,
  addMessages,
} = require("../controllers/chat.controller");

const route = Router();

route.get("/", getAllMessages);
route.post("/", addMessages);

module.exports = route;
