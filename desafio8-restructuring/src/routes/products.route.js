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

productsRoute.get(
  "/",
  passport.authenticate("jwt", { session: false,failureRedirect:"/login" }),
  getAllProducts
);
productsRoute.post(
  "/",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  isAuth,
  createOneProduct
);
productsRoute.post(
  "/fulldb",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  createManyProducts
);
productsRoute.put(
  "/:pid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  isAuth,
  updateProduct
);
productsRoute.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false ,failureRedirect:"/login"}),
  isAuth,
  deleteProduct
);

module.exports = productsRoute;
