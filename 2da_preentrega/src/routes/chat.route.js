const { Router } = require("express");
const { getAllMessages } = require("../controllers/chat.controller");

const route = Router();

route.get("/", getAllMessages);

module.exports = route;
