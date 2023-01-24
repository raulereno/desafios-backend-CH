const router = require("express").Router();
const products = require("./products.routes");
const carts = require("./carts.routes");

router.use("/products", products);
router.use("/carts", carts);

module.exports = router;
