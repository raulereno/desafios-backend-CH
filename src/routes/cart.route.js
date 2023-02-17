const { Router } = require("express");
const {
  createCart,
  addProductToCart,
  getCart,
} = require("../controllers/cart.controller");
const route = Router();

route.get("/", async (req, res) => {
  const { cartid } = req.query;
  try {
    const cart = await getCart(cartid);
    res.render("cart", { style: "index.css", products: cart.products });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const result = await createCart();
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

route.post("/addProduct", async (req, res) => {
  const { cartId, productId } = req.body;
  try {
    const result = await addProductToCart(cartId, productId);
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
