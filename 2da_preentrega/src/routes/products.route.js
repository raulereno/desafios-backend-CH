const { Router } = require("express");
const {
  getAllProducts,
  createOneProduct,
  createManyProducts,
} = require("../controllers/products.controller");
const route = Router();

route.get("/", getAllProducts);

route.post("/", createOneProduct);
route.post("/fulldb", createManyProducts);
route.put("/", async (req, res) => {
  try {
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});
route.delete("/", async (req, res) => {
  try {
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

module.exports = route;
