const router = require("express").Router();
const productsRealTime = require("./productsRealTime.routes").router;
const products = require("./products.routes");

router.use("/realtimeproducts", productsRealTime);
router.use("/products", products);

module.exports = router;
