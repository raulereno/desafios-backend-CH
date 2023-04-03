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

route.get("/:cid", passport.authenticate("jwt", { session: false }), getCart);
route.post("/", createCart);
route.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  addProductToCart
);
route.put(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  updateQuantityProduct
);
route.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  deleteProductInCart
);
route.put(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  addManyProductsToCart
);
route.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  deleteCart
);

module.exports = route;
