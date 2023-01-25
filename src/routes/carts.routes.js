const {
  createCart,
  getCart,
  addProductToCart,
} = require("../controllers/carts.controllers");

const router = require("express").Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await getCart(cid);
    res.status(200).send({ status: "success", products: cart });
  } catch (err) {
    res.status(404).send({ status: "reject", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await createCart(req.body);

    res
      .status(201)
      .send({ status: "success", msg: "Cart created sucessfully" });
  } catch (err) {
    res.status(400).send({ status: "reject", msg: err.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await addProductToCart(cid, pid, quantity);

    res.status(201).send({
      status: "success",
      msg: `We add the product with id ${cid} to the cart with id ${pid} `,
    });
  } catch (err) {
    res.status(404).send({ status: "reject", msg: err.message });
  }
});

module.exports = router;
