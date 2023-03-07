const express = require("express");
const router = express.Router();
const productManager = require("./../scripts/ProductManager");

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    let products = await productManager.getProducts();
    if (limit) {
      products = products.splice(0, limit);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error.msg);
  }
});
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    res.status(200).json(await productManager.getProductById(pid));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
