const CartDAO = require("../dao/cart.dao");
const cartSchema = require("../models/cart.model");

const cartServices = new CartDAO("Cart", cartSchema);

const getCartService = async (cartId) => {
  try {
    const result = await cartServices.getCartById(cartId);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const createCartService = async () => {
  try {
    const result = await cartServices.createCart();
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addProductToCartService = async ({ cid, pid }) => {
  try {
    const result = await cartServices.addProductToCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductInCartService = async ({ cid, pid }) => {
  try {
    const result = await cartServices.deleteProductInCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteCartService = async ({ cid }) => {
  try {
    const result = await cartServices.deleteCart(cid);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addManyProductsToCartService = async (products, { cid }) => {
  try {
    const result = await cartServices.addManyProductsToCart(products, cid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateQuantityProductService = async ({ cid, pid }, { quantity }) => {
  try {
    const result = await cartServices.updateQuantityProduct(cid, pid, quantity);
    return result;
  } catch (error) {
    throw Error(error);
  }
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
