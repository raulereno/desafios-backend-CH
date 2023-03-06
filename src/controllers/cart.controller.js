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
  const result = await createCartService();

  res.status(200).send(result);
};

const addProductToCart = async (req, res) => {
  const result = await addProductToCartService(req.params);

  res.status(200).send(result);
};

const updateProductInCart = async (req, res) => {};

const deleteProductInCart = async (req, res) => {
  const result = await deleteProductInCartService(req.params);

  res.status(200).send(result);
};

const deleteCart = async (req, res) => {
  const result = await deleteCartService(req.params);

  res.status(200).send(result);
};

const addManyProductsToCart = async (req, res) => {
  const result = await addManyProductsToCartService(req.body, req.params);

  res.status(200).send(result);
};

const updateQuantityProduct = async (req, res) => {
  const result = await updateQuantityProductService(req.params, req.body);
  res.status(200).send(result);
};
module.exports = {
  getCart,
  createCart,
  addProductToCart,
  updateProductInCart,
  deleteProductInCart,
  deleteCart,
  addManyProductsToCart,
  updateQuantityProduct,
};
