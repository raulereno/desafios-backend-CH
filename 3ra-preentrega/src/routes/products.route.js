const {
  getAllProducts,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const passport = require("passport");
const isLogged = require("../middlewares/isLogged");
const productsRoute = Router();

productsRoute.get("/", isLogged, getAllProducts);
productsRoute.post("/", isLogged, isAuth, createOneProduct);
productsRoute.post("/fulldb", isLogged, isAuth, createManyProducts);
productsRoute.put("/:pid", isLogged, isAuth, updateProduct);
productsRoute.delete("/:pid", isLogged, isAuth, deleteProduct);

module.exports = productsRoute;
