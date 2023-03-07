const express = require("express");
const morgan = require("morgan");
const server = express();
const path = require("path");
const { engine } = require("express-handlebars");
const { getProducts } = require("./controllers/products.controllers");
const routes = require("./routes/index.routes");

server.use(morgan("dev"));
server.engine("handlebars", engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, "/public")));

server.use("/", routes);

server.get("/", async (req, res) => {
  const products = await getProducts();

  res.render("home", { products, title: "Products", style: "index.css" });
});

module.exports = server;
