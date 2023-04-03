const { Router } = require("express");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");
const chatRoute = require("./chat.route");
const productsRoute = require("./products.route");
const routes = Router();

routes.use("/", userRoute);
routes.use("/products", productsRoute);
routes.use("/cart", cartRoute);
routes.use("/chat", chatRoute);

module.exports = routes;
