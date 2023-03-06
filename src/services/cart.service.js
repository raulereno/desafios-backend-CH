const CartDAO = require("../dao/cart.dao");
const cartSchema = require("../models/cart.model");

const cartServices = new CartDAO("Cart", cartSchema);

const getCartService = async (cartId) => {
  const result = await cartServices.getCartById(cartId);

  return result;
};

const createCartService = async () => {
  const result = await cartServices.createCart();

  return result;
};

const addProductToCartService = async ({ cid, pid }) => {
  const result = await cartServices.addProductToCart(cid, pid);

  return result;
};

const deleteProductInCartService = async ({ cid, pid }) => {
  const result = await cartServices.deleteProductInCart(cid, pid);

  return result;
};

const deleteCartService = async ({ cid }) => {
  const result = await cartServices.deleteCart(cid);

  return result;
};

const addManyProductsToCartService = async (products, { cid }) => {
  console.log(products);

  const result = await cartServices.addManyProductsToCart(products, cid);

  return result;
};

const updateQuantityProductService = async ({ cid, pid }, { quantity }) => {
  const result = await cartServices.updateQuantityProduct(cid, pid, quantity);

  return result;
};

module.exports = {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductInCartService,
  deleteCartService,
  addManyProductsToCartService,
  updateQuantityProductService,
};
