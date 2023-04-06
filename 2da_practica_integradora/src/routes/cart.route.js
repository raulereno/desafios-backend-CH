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
const passport = require("passport");

const route = Router();

route.get("/:cid", passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}), getCart);
route.post("/", createCart);
route.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  addProductToCart
);
route.put(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  updateQuantityProduct
);
route.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  deleteProductInCart
);
route.put(
  "/:cid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  addManyProductsToCart
);
route.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  deleteCart
);

module.exports = route;
