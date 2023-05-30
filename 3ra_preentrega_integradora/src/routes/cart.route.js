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
const isLogged = require("../middlewares/isLogged");
const { purchaseProducts } = require("../controllers/ticket.controller");
const isOwner = require("../middlewares/isOwner");

const route = Router();

route.get("/:cid", isLogged, getCart);
route.post("/", createCart);
route.post("/:cid/product/:pid", isLogged, isOwner, addProductToCart);
route.put("/:cid/product/:pid", isLogged, updateQuantityProduct);
route.delete("/:cid/product/:pid", isLogged, deleteProductInCart);
route.put("/:cid", isLogged, addManyProductsToCart);
route.delete("/:cid", isLogged, deleteCart);
route.get("/:cid/purchase", isLogged, purchaseProducts);

module.exports = route;
