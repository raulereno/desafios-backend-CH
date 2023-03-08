const { Router } = require("express");
const {
  createCart,
  addProductToCart,
  getCart,
  deleteProductInCart,
  deleteCart,
  addManyProductsToCart,
  updateQuantityProduct,
} = require("../controllers/cart.controller");
const route = Router();

route.get("/:cid", getCart);
route.post("/", createCart);
route.post("/:cid/product/:pid", addProductToCart);
route.put("/:cid/product/:pid", updateQuantityProduct);
route.delete("/:cid/product/:pid", deleteProductInCart);
route.put("/:cid", addManyProductsToCart);
route.delete("/:cid", deleteCart);

module.exports = route;
