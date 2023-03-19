const {
  getAllProducts,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { Router } = require("express");
const isLogged = require("../middlewares/isLogged");
const isAuth = require("../middlewares/isAuth");
const productsRoute = Router();

productsRoute.get("/", isLogged, getAllProducts);
productsRoute.post("/", isAuth, createOneProduct);
productsRoute.post("/fulldb", isAuth, createManyProducts);
productsRoute.put("/:pid", isAuth, updateProduct);
productsRoute.delete("/:pid", isAuth, deleteProduct);

module.exports = productsRoute;
