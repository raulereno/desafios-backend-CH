const {
  allProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controllers");

const router = require("express").Router();

//Lista todos los productos, si posee un limite lo aplica
router.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await allProducts(limit);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ status: "reject", msg: [] });
  }
});

//Busco un producto por su id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await getProductById(pid);
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res
      .status(201)
      .send({
        status: "success",
        msg: `The new product has a id ${newProduct.id}`,
      });
  } catch (err) {
    res.status(400).send({ status: "Error", msg: err.message });
  }

  res.end();
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await updateProduct(pid, req.body);

    res.status(201).send({
      status: "success",
      msg: `Product with id ${pid} as been updated`,
    });
  } catch (err) {
    res.status(400).send({ status: "rejected", msg: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await deleteProduct(pid);

    res.status(201).send({
      status: "success",
      msg: `Product with id ${pid} as been deleted`,
    });
  } catch (err) {
    res.status(400).send({ status: "rejected", msg: err.message });
  }
});

module.exports = router;
