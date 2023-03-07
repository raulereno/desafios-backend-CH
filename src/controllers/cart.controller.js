const {
  createCartService,
  addProductToCartService,
  getCartService,
  deleteProductInCartService,
  deleteCartService,
  addManyProductsToCartService,
  updateQuantityProductService,
} = require("../services/cart.service");

const getCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await getCartService(cid);

  res.render("cart", {
    title: "Desafio - Carrito",
    productsInCart: cart.products,
    style: "index.css",
  });
};

const createCart = async (req, res) => {
  try {
    const result = await createCartService();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const result = await addProductToCartService(req.params);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const result = await deleteProductInCartService(req.params);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const result = await deleteCartService(req.params);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const addManyProductsToCart = async (req, res) => {
  try {
    const result = await addManyProductsToCartService(req.body, req.params);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const updateQuantityProduct = async (req, res) => {
  try {
    const result = await updateQuantityProductService(req.params, req.body);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};
module.exports = {
  getCart,
  createCart,
  addProductToCart,
  deleteProductInCart,
  deleteCart,
  addManyProductsToCart,
  updateQuantityProduct,
};
