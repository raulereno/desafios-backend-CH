const { Router } = require("express");
const productsRoute = require("./products.route");
const routes = Router();

routes.use("/products", productsRoute);

module.exports = routes;
