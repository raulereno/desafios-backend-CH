const { Router } = require("express");
const userRoute = require("./user.route");

const routes = Router();

routes.use("", userRoute);

module.exports = routes;

