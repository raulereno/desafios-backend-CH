const { Router } = require("express");
const isLogged = require("../middlewares/isLogged");
const { paymentMethods } = require("../controllers/payment.controller");

const route = Router();

route.get("/", isLogged, paymentMethods);

module.exports = route;
