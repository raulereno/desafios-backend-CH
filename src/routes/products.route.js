const { Router } = require("express");
const {
  getAllProducts,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const route = Router();

route.get("/", getAllProducts);
route.post("/", createOneProduct);
route.post("/fulldb", createManyProducts);
route.put("/:pid", updateProduct);

route.delete("/:pid", deleteProduct);

module.exports = route;
