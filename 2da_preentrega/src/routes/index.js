const { Router } = require("express");
const productsRoute = require("./products.route");
const cartRoute = require("./cart.route");
const chatRoute = require("./chat.route");
const routes = Router();

routes.use("/products", productsRoute);
routes.use("/cart", cartRoute);
routes.use("/chat", chatRoute);

module.exports = routes;
