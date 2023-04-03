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
const productsRoute = Router();

productsRoute.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);
productsRoute.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAuth,
  createOneProduct
);
productsRoute.post(
  "/fulldb",
  passport.authenticate("jwt", { session: false }),
  createManyProducts
);
productsRoute.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  isAuth,
  updateProduct
);
productsRoute.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  isAuth,
  deleteProduct
);

module.exports = productsRoute;
