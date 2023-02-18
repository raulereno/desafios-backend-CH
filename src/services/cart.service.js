const CartManager = require("../dao/mongoDb/cart.dao");
const cartSchema = require("../dao/models/cart.model");
const { getProductsService } = require("./product.service");

const cartDAO = new CartManager("carts", cartSchema);

const getCartService = async (id) => {
  const cart = await cartDAO.getCart(id);

  return cart;
};
const createCartService = async () => {
  const newCart = await cartDAO.createCart();
  return newCart;
};

const addProductToCartService = async (cartId, productId) => {
  const result = await cartDAO.addProduct(cartId, productId);

  return result;
};

const deleteProductInCartService = async (cartId, productId) => {
  const result = await cartDAO.deleteProduct(cartId, productId);

  return result;
};

module.exports = {
  createCartService,
  addProductToCartService,
  getCartService,
  deleteProductInCartService,
};
